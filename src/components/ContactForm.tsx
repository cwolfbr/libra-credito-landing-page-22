
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';

interface ContactFormProps {
  simulationResult: {
    valor: number;
    amortizacao: string;
    parcelas: number;
    primeiraParcela?: number;
    ultimaParcela?: number;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({ simulationResult }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!aceitePrivacidade) {
      alert('É necessário aceitar a Política de Privacidade para continuar.');
      return;
    }

    setLoading(true);
    
    try {
      // Aqui você pode implementar o envio dos dados para sua API
      console.log('Dados do contato:', {
        nome,
        email,
        telefone,
        simulacao: simulationResult
      });
      
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
      
      // Limpar formulário
      setNome('');
      setEmail('');
      setTelefone('');
      setAceitePrivacidade(false);
      
    } catch (error) {
      console.error('Erro ao enviar solicitação:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const valorFormatado = simulationResult.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return (
    <div className="space-y-4">
      {/* Resultado da simulação */}
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4 text-center">
          <div className="bg-blue-800 rounded-lg p-3 mb-3 inline-block">
            <p className="text-sm mb-1">Valor da sua parcela:</p>
            <p className="text-2xl font-bold">{valorFormatado}</p>
          </div>
          
          <div className="text-xs space-y-1">
            <p>
              Parcela calculada pela tabela {simulationResult.amortizacao.toUpperCase()} com taxa de juros de 1,19% a.m. + PCA. Esta taxa pode 
              sofre alterações de acordo com a análise de crédito. Já estão inclusos custos com 
              avaliação do imóvel, cartório e impostos.
            </p>
            
            {simulationResult.amortizacao === 'SAC' && simulationResult.primeiraParcela && simulationResult.ultimaParcela && (
              <p className="mt-2">
                <strong>Sistema SAC:</strong> Primeira parcela: {simulationResult.primeiraParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} | 
                Última parcela: {simulationResult.ultimaParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Formulário de contato */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-libra-navy text-center">
            Gostou? Preencha os campos abaixo e solicite uma análise de crédito! Em breve a 
            nossa equipe entrará em contato para dar continuidade no processo do seu 
            empréstimo.
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome Completo"
              required
            />
            
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
            />
            
            <Input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Telefone (99) 99999-9999"
              required
            />

            <div className="space-y-3">
              <p className="text-sm font-medium text-libra-navy">O imóvel em garantia é:</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="tipoImovel" value="proprio" className="text-libra-blue" />
                  Próprio
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" name="tipoImovel" value="terceiro" className="text-libra-blue" />
                  De terceiro
                </label>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="aceite"
                checked={aceitePrivacidade}
                onCheckedChange={(checked) => setAceitePrivacidade(checked as boolean)}
              />
              <label htmlFor="aceite" className="text-xs text-gray-600 leading-tight">
                Tenho ciência e concordo que meus dados de contato aqui informados poderão ser 
                utilizados pela Libra Crédito de acordo com os termos da{' '}
                <Link 
                  to="/politica-privacidade" 
                  className="text-libra-blue underline hover:text-libra-navy"
                  target="_blank"
                >
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={loading || !aceitePrivacidade}
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-3 text-sm font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Enviando...
                </div>
              ) : (
                'SOLICITAR ANÁLISE'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
