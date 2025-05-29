
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatBRL } from '@/utils/formatters';
import { validateForm } from '@/utils/validations';
import { simulateCredit } from '@/services/simulationApi';
import CityField from './form/CityField';
import LoanAmountField from './form/LoanAmountField';
import GuaranteeAmountField from './form/GuaranteeAmountField';
import InstallmentsField from './form/InstallmentsField';
import AmortizationField from './form/AmortizationField';
import ResultCard from './ResultCard';

const SimulationForm: React.FC = () => {
  const [emprestimo, setEmprestimo] = useState('');
  const [garantia, setGarantia] = useState('');
  const [parcelas, setParcelas] = useState<number>(36);
  const [amortizacao, setAmortizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);
  const [erro, setErro] = useState('');

  // Validações
  const validation = validateForm(emprestimo, garantia, parcelas, amortizacao, cidade);

  const handleEmprestimoChange = (value: string) => {
    setEmprestimo(formatBRL(value));
  };

  const handleGarantiaChange = (value: string) => {
    setGarantia(formatBRL(value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validation.formularioValido) return;

    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      const payload = {
        valor_solicitado: validation.emprestimoValue,
        vlr_imovel: validation.garantiaValue,
        numero_parcelas: parcelas,
        amortizacao: amortizacao,
        juros: 1.19,
        carencia: 1
      };

      const data = await simulateCredit(payload);

      // Extração do valor da primeira parcela
      const primeiraParcela = data.parcelas[0].parcela[0];
      setResultado(primeiraParcela);

    } catch (error) {
      console.error('Erro na simulação:', error);
      setErro('Erro ao realizar simulação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setEmprestimo('');
    setGarantia('');
    setParcelas(36);
    setAmortizacao('');
    setCidade('');
    setResultado(null);
    setErro('');
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl min-h-[calc(100vh-5rem)]">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl md:text-2xl font-bold text-libra-navy mb-2">
            Sua simulação em um clique!
          </CardTitle>
          <p className="text-gray-600 text-sm">
            Com apenas algumas informações você já encontrará a proposta ideal, com parcelas que cabem no seu bolso!
          </p>
        </CardHeader>
        
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <CityField value={cidade} onChange={setCidade} />

            <LoanAmountField value={emprestimo} onChange={handleEmprestimoChange} />

            <GuaranteeAmountField 
              value={garantia} 
              onChange={handleGarantiaChange}
              showError={validation.emprestimoExcedeGarantia}
            />

            <InstallmentsField value={parcelas} onChange={setParcelas} />

            <AmortizationField value={amortizacao} onChange={setAmortizacao} />

            {/* Botões */}
            <div className="flex gap-3 pt-3">
              <Button
                type="submit"
                disabled={!validation.formularioValido || loading}
                className="flex-1 bg-libra-blue hover:bg-libra-blue/90 text-white py-2.5 text-base font-semibold min-h-[48px]"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Calculando...
                  </div>
                ) : (
                  'CALCULAR'
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClear}
                className="px-6 py-2.5 text-libra-blue border-libra-blue hover:bg-libra-light min-h-[48px]"
              >
                LIMPAR
              </Button>
            </div>

            {erro && (
              <div className="text-red-500 text-center text-sm mt-3">
                {erro}
              </div>
            )}
          </form>

          {/* Resultado */}
          {resultado && <ResultCard valor={resultado} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationForm;
