
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, DollarSign, Home, Calendar } from 'lucide-react';
import axios from 'axios';
import ResultCard from './ResultCard';

// Função para normalizar valores em formato brasileiro para Number
const norm = (s: string) =>
  Number(s.replace(/\./g, '').replace(/,/g, '.').replace(/[^0-9.]/g, ''));

// Função para formatar valor em formato brasileiro
const formatBRL = (value: string) => {
  const num = value.replace(/\D/g, '');
  if (!num) return '';
  
  const formatted = Number(num).toLocaleString('pt-BR');
  return `R$ ${formatted}`;
};

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formularioValido) return;

    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      const payload = {
        valor_solicitado: emprestimoValue,
        vlr_imovel: garantiaValue,
        numero_parcelas: parcelas,
        amortizacao: amortizacao,
        juros: 1.19,
        carencia: 1
      };

      console.log('Payload enviado:', payload);

      const { data } = await axios.post(
        'https://api-calculos.vercel.app/simulacao',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Resposta da API:', data);

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

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold text-libra-navy">
            Sua simulação em um clique!
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Com apenas algumas informações você já encontrará a proposta ideal, com parcelas que cabem no seu bolso!
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Cidade do Imóvel */}
            <div className="flex items-start gap-3">
              <div className="bg-libra-light p-2 rounded-full mt-1">
                <MapPin className="w-5 h-5 text-libra-blue" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-libra-navy mb-2">
                  Selecione a cidade do imóvel a ser dado de garantia
                </label>
                <Select value={cidade} onValueChange={setCidade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Cidade/UF do imóvel a ser dado em Garantia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ribeirao-preto-sp">Ribeirão Preto/SP</SelectItem>
                    <SelectItem value="sao-paulo-sp">São Paulo/SP</SelectItem>
                    <SelectItem value="campinas-sp">Campinas/SP</SelectItem>
                    <SelectItem value="santos-sp">Santos/SP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Valor do Empréstimo */}
            <div className="flex items-start gap-3">
              <div className="bg-libra-light p-2 rounded-full mt-1">
                <DollarSign className="w-5 h-5 text-libra-blue" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-libra-navy mb-2">
                  Digite o valor desejado do Empréstimo
                </label>
                <Input
                  value={emprestimo}
                  onChange={(e) => setEmprestimo(formatBRL(e.target.value))}
                  placeholder="R$ 75.000,00"
                  className="text-lg"
                />
              </div>
            </div>

            {/* Valor da Garantia */}
            <div className="flex items-start gap-3">
              <div className="bg-libra-light p-2 rounded-full mt-1">
                <Home className="w-5 h-5 text-libra-blue" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-libra-navy mb-2">
                  Digite o valor do Imóvel em Garantia
                </label>
                <Input
                  value={garantia}
                  onChange={(e) => setGarantia(formatBRL(e.target.value))}
                  placeholder="R$ 300.000,00"
                  className="text-lg"
                />
                {emprestimoExcedeGarantia && (
                  <p className="text-red-500 text-sm mt-1">
                    O empréstimo não pode exceder 80% do valor da garantia
                  </p>
                )}
              </div>
            </div>

            {/* Quantidade de Parcelas */}
            <div className="flex items-start gap-3">
              <div className="bg-libra-light p-2 rounded-full mt-1">
                <Calendar className="w-5 h-5 text-libra-blue" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-libra-navy mb-2">
                  Em quantas parcelas?
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="12"
                    max="240"
                    value={parcelas}
                    onChange={(e) => setParcelas(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>12</span>
                    <span>60</span>
                    <span>120</span>
                    <span>180</span>
                    <span>240</span>
                  </div>
                  <div className="text-right mt-2">
                    <span className="bg-libra-blue text-white px-2 py-1 rounded text-sm font-bold">
                      {parcelas}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tipo de Amortização */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-libra-navy">
                Escolha a Amortização
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="PRICE"
                    checked={amortizacao === 'PRICE'}
                    onChange={(e) => setAmortizacao(e.target.value)}
                    className="text-libra-blue"
                  />
                  <span className="text-sm">PRICE</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="SAC"
                    checked={amortizacao === 'SAC'}
                    onChange={(e) => setAmortizacao(e.target.value)}
                    className="text-libra-blue"
                  />
                  <span className="text-sm">SAC</span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={!formularioValido || loading}
                className="flex-1 bg-libra-blue hover:bg-libra-blue/90 text-white py-3 text-lg font-semibold"
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
                onClick={() => {
                  setEmprestimo('');
                  setGarantia('');
                  setParcelas(36);
                  setAmortizacao('');
                  setCidade('');
                  setResultado(null);
                  setErro('');
                }}
                className="px-6 py-3 text-libra-blue border-libra-blue hover:bg-libra-light"
              >
                LIMPAR
              </Button>
            </div>

            {erro && (
              <div className="text-red-500 text-center mt-4">
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
