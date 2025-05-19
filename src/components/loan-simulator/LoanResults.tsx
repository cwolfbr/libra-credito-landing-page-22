
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { HelpCircle, Info } from 'lucide-react';
import { formatCurrency } from './utils';
import { LoanResults as LoanResultsType } from './types';

interface LoanResultsProps {
  results: LoanResultsType;
  onRequestContact: () => void;
}

const LoanResults: React.FC<LoanResultsProps> = ({ results, onRequestContact }) => {
  const { monthlyPayment, requiredIncome, minPropertyValue, maxPropertyValue } = results;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200 animate-fade-in">
      <h3 className="text-xl font-bold text-libra-navy mb-4 text-center">Resultado da Simulação</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-libra-light p-6 rounded-lg text-center">
          <p className="text-sm text-gray-700 mb-2">Parcela mensal estimada:</p>
          <p className="text-3xl font-bold text-libra-navy">{formatCurrency(monthlyPayment)}</p>
          <p className="text-xs text-gray-700 mt-2">*Valores aproximados, sujeitos à análise de crédito</p>
          <p className="text-xs text-gray-700 mt-1">Taxa a partir de 1,09% a.m. + IPCA em até 180 meses</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-libra-light p-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <p className="text-sm text-gray-700" id="requiredIncomeLabel">Renda familiar necessária:</p>
              <Tooltip>
                <TooltipTrigger aria-label="Mais informações sobre renda necessária">
                  <HelpCircle className="w-4 h-4 text-gray-600" aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>A renda familiar necessária é calculada com base no comprometimento máximo de 30% da renda com a parcela, para evitar o superendividamento.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-3xl font-bold text-libra-navy" aria-labelledby="requiredIncomeLabel">{formatCurrency(requiredIncome)}</p>
            <p className="text-xs text-gray-700 mt-2">*Valores aproximados, sujeitos à análise de crédito</p>
          </div>
          
          <div className="bg-libra-light p-6 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <p className="text-sm text-gray-700" id="propertyValueLabel">Avaliação do imóvel mínima necessária:</p>
              <Tooltip>
                <TooltipTrigger aria-label="Mais informações sobre avaliação do imóvel">
                  <Info className="w-4 h-4 text-gray-600" aria-hidden="true" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Dependendo das características do imóvel (tipo, região e documentação), a avaliação mínima necessária pode ser até {formatCurrency(maxPropertyValue)}.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-3xl font-bold text-libra-navy" aria-labelledby="propertyValueLabel">{formatCurrency(minPropertyValue)}</p>
            <p className="text-xs text-gray-700 mt-2">*Dependendo das características do imóvel (tipo, região e documentação), pode ser necessário até {formatCurrency(maxPropertyValue)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Button 
          className="min-h-[48px] min-w-[200px]"
          variant="highContrast"
          size="xl"
          onClick={onRequestContact}
          aria-label="Solicitar contato com um consultor"
        >
          Solicitar Contato
        </Button>
      </div>
    </div>
  );
};

export default LoanResults;
