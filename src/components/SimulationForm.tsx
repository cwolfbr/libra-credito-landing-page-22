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
import ContactForm from './ContactForm';

const SimulationForm: React.FC = () => {
  const [emprestimo, setEmprestimo] = useState('');
  const [garantia, setGarantia] = useState('');
  const [parcelas, setParcelas] = useState<number>(36);
  const [amortizacao, setAmortizacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<{
    valor: number;
    amortizacao: string;
    parcelas: number;
    primeiraParcela?: number;
    ultimaParcela?: number;
  } | null>(null);
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

      console.log('Enviando payload:', payload);

      const data = await simulateCredit(payload);

      console.log('Resposta recebida:', data);

      // Verificar se a resposta tem dados válidos
      if (!data || !data.parcelas || !Array.isArray(data.parcelas) || data.parcelas.length === 0) {
        console.error('Estrutura de resposta inválida:', data);
        throw new Error('API retornou estrutura de dados inválida');
      }

      // Buscar a primeira parcela com valor válido em parcela_final
      const parcelaComValor = data.parcelas.find((p, index) => 
        index > 0 && p.parcela_final && p.parcela_final[0] > 0
      );

      if (!parcelaComValor) {
        console.error('Nenhuma parcela com valor válido encontrada:', data.parcelas);
        throw new Error('API não retornou parcelas com valores válidos');
      }

      const valorParcela = parcelaComValor.parcela_final[0];
      console.log('Valor da parcela extraído:', valorParcela);

      let primeiraParcela = undefined;
      let ultimaParcela = undefined;

      if (amortizacao === 'SAC') {
        // Para SAC, buscar primeira parcela não vazia
        const primeiraParcelaObj = data.parcelas.find((p, index) => 
          index > 0 && p.parcela_final && p.parcela_final[0] > 0
        );
        
        if (primeiraParcelaObj?.parcela_final?.[0]) {
          primeiraParcela = primeiraParcelaObj.parcela_final[0];
        }

        // Para SAC, buscar última parcela não vazia
        const ultimaParcelaObj = data.parcelas.slice().reverse().find(p => 
          p.parcela_final && p.parcela_final[0] > 0
        );
        
        if (ultimaParcelaObj?.parcela_final?.[0]) {
          ultimaParcela = ultimaParcelaObj.parcela_final[0];
        }
      }

      setResultado({
        valor: valorParcela,
        amortizacao: amortizacao,
        parcelas: parcelas,
        primeiraParcela: primeiraParcela,
        ultimaParcela: ultimaParcela
      });

    } catch (error) {
      console.error('Erro na simulação:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      setErro(`Erro ao realizar simulação: ${errorMessage}`);
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
    <div className="container mx-auto px-3 py-2 max-w-xl min-h-[calc(100vh-4rem)]">
      <Card className="shadow-lg">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg md:text-xl font-bold text-libra-navy mb-1">
            Sua simulação em um clique!
          </CardTitle>
          <p className="text-gray-600 text-xs">
            Com apenas algumas informações você já encontrará a proposta ideal, com parcelas que cabem no seu bolso!
          </p>
        </CardHeader>
        
        <CardContent className="p-3 md:p-4">
          {!resultado ? (
            <form onSubmit={handleSubmit} className="space-y-2">
              
              <CityField value={cidade} onChange={setCidade} />

              <LoanAmountField value={emprestimo} onChange={handleEmprestimoChange} />
              
              {validation.emprestimoForaRange && (
                <div className="text-red-500 text-xs">
                  O empréstimo deve estar entre R$ 100.000 e R$ 5.000.000
                </div>
              )}

              <GuaranteeAmountField 
                value={garantia} 
                onChange={handleGarantiaChange}
                showError={validation.emprestimoExcedeGarantia}
              />

              <InstallmentsField value={parcelas} onChange={setParcelas} />

              <AmortizationField value={amortizacao} onChange={setAmortizacao} />

              {/* Botões */}
              <div className="flex gap-2 pt-2">
                <Button
                  type="submit"
                  disabled={!validation.formularioValido || loading}
                  className="flex-1 bg-libra-blue hover:bg-libra-blue/90 text-white py-2 text-sm font-semibold min-h-[44px]"
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
                  className="px-4 py-2 text-libra-blue border-libra-blue hover:bg-libra-light min-h-[44px] text-sm"
                >
                  LIMPAR
                </Button>
              </div>

              {erro && (
                <div className="text-red-500 text-center text-xs mt-2">
                  {erro}
                </div>
              )}
            </form>
          ) : (
            <ContactForm simulationResult={resultado} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulationForm;
