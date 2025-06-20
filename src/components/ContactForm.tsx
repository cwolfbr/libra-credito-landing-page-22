
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from 'react-router-dom';
import { LocalSimulationService } from '@/services/localSimulationService';
import { useUserJourney } from '@/hooks/useUserJourney';

interface ContactFormProps {
  simulationResult: {
    id?: string;
    valor: number;
    amortizacao: string;
    parcelas: number;
    primeiraParcela?: number;
    ultimaParcela?: number;
  };
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  compact?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ 
  simulationResult, 
  className = '',
  inputClassName = '',
  buttonClassName = '',
  compact = false 
}) => {
  const { sessionId } = useUserJourney();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [imovelProprio, setImovelProprio] = useState<'proprio' | 'terceiro' | ''>('');
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para aplicar máscara de telefone
  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara conforme o número de dígitos
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setTelefone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('🔍 Debug dados da simulação:', {
      simulationResult,
      simulationId: simulationResult.id,
      sessionId,
      hasId: !!simulationResult.id,
      hasSessionId: !!sessionId
    });
    
    if (!aceitePrivacidade) {
      alert('É necessário aceitar a Política de Privacidade para continuar.');
      return;
    }

    if (!imovelProprio) {
      alert('Por favor, informe se o imóvel é próprio ou de terceiro.');
      return;
    }

    if (!simulationResult.id) {
      console.error('❌ ID da simulação não encontrado:', simulationResult);
      alert('Erro: ID da simulação não encontrado. Tente simular novamente.');
      return;
    }
    
    if (!sessionId) {
      console.error('❌ Session ID não encontrado');
      alert('Erro: Session ID não encontrado. Tente recarregar a página.');
      return;
    }

    setLoading(true);
    
    try {
      console.log('📋 Enviando formulário de contato:', {
        simulationId: simulationResult.id,
        sessionId,
        nome,
        email,
        telefone,
        imovelProprio,
        imovelProprioTexto: imovelProprio === 'proprio' ? 'Imóvel Próprio' : 'Imóvel de Terceiro'
      });
      
      // Usar o serviço local com dados da simulação
      await LocalSimulationService.processContact({
        simulationId: simulationResult.id,
        sessionId,
        nomeCompleto: nome,
        email,
        telefone,
        imovelProprio,
        observacoes: `Simulação: ${simulationResult.amortizacao} - ${simulationResult.parcelas}x - R$ ${simulationResult.valor.toLocaleString('pt-BR')}`,
        // Dados adicionais para API Ploomes
        valorDesejadoEmprestimo: simulationResult.valorEmprestimo,
        valorImovelGarantia: simulationResult.valorImovel,
        valorParcelaCalculada: simulationResult.valor,
        tipoAmortizacao: simulationResult.amortizacao,
        quantidadeParcelas: simulationResult.parcelas,
        aceitaPolitica: aceitePrivacidade
      });
      
      // Mensagem de sucesso mais detalhada
      const mensagemSucesso = `🎉 Solicitação enviada com sucesso!\n\n✅ Seus dados foram registrados\n✅ Nossa equipe entrará em contato em breve\n📞 Fique atento ao telefone e e-mail cadastrados`;
      
      alert(mensagemSucesso);
      
      // Limpar formulário
      setNome('');
      setEmail('');
      setTelefone('');
      setImovelProprio('');
      setAceitePrivacidade(false);
      
    } catch (error) {
      console.error('❌ Erro ao enviar solicitação:', error);
      
      let mensagemErro = 'Erro ao enviar solicitação. ';
      
      if (error instanceof Error) {
        // Verificar se é erro de duplicidade do Ploomes/CRM
        if (error.message.toLowerCase().includes('já existe') || 
            error.message.toLowerCase().includes('7 dias') ||
            error.message.toLowerCase().includes('lead já existe')) {
          mensagemErro = '⚠️ Você já possui uma solicitação em andamento.\n\nNossa equipe já está analisando seu pedido anterior.\nAguarde nosso contato!\n\n📞 Em caso de dúvidas, entre em contato pelo WhatsApp.';
        } else {
          mensagemErro += error.message;
        }
      } else {
        mensagemErro += 'Por favor, tente novamente.';
      }
      
      alert(mensagemErro);
    } finally {
      setLoading(false);
    }
  };

  const valorFormatado = simulationResult.valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  // Versão compacta para uso no resultado visual
  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <div>
          <label htmlFor="nome-compact" className="sr-only">
            Nome Completo
          </label>
          <Input
            id="nome-compact"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome Completo"
            className={inputClassName}
            required
            aria-required="true"
          />
        </div>
        
        <div>
          <label htmlFor="email-compact" className="sr-only">
            E-mail
          </label>
          <Input
            id="email-compact"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            className={inputClassName}
            required
            aria-required="true"
          />
        </div>
        
        <div>
          <label htmlFor="telefone-compact" className="sr-only">
            Telefone
          </label>
          <Input
            id="telefone-compact"
            type="tel"
            value={telefone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Telefone (99) 99999-9999"
            className={inputClassName}
            inputMode="numeric"
            required
            aria-required="true"
          />
        </div>
        
        <fieldset className="space-y-2">
          <legend className="text-xs text-white/90">
            O imóvel que será utilizado como garantia é: *
          </legend>
          <div className="flex gap-3">
            <label className="flex items-center gap-1 text-xs text-white/90">
              <input 
                type="radio" 
                name="imovelProprioCompact" 
                value="proprio" 
                checked={imovelProprio === 'proprio'}
                onChange={(e) => setImovelProprio(e.target.value as 'proprio')}
                className="text-white"
                required
              />
              Imóvel Próprio
            </label>
            <label className="flex items-center gap-1 text-xs text-white/90">
              <input 
                type="radio" 
                name="imovelProprioCompact" 
                value="terceiro" 
                checked={imovelProprio === 'terceiro'}
                onChange={(e) => setImovelProprio(e.target.value as 'terceiro')}
                className="text-white"
                required
              />
              Imóvel de terceiro
            </label>
          </div>
        </fieldset>

        <div className="flex items-start gap-2">
          <Checkbox
            id="aceite-compact"
            checked={aceitePrivacidade}
            onCheckedChange={(checked) => setAceitePrivacidade(checked as boolean)}
          />
          <label htmlFor="aceite-compact" className="text-xs text-white/90 leading-tight">
            Concordo com a{' '}
            <Link 
              to="/politica-privacidade" 
              className="underline hover:text-white"
              target="_blank"
            >
              Política de Privacidade
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading || !aceitePrivacidade}
          className={`w-full py-3 text-sm font-semibold ${buttonClassName}`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              Enviando...
            </div>
          ) : (
            'SOLICITAR ANÁLISE'
          )}
        </Button>
      </form>
    );
  }

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
              Parcela calculada pela tabela {simulationResult.amortizacao.toUpperCase()} com
              taxa de juros de 1,19% a.m. + IPCA. Esta taxa pode sofrer alterações de acordo
              com a análise de crédito. Já estão inclusos custos com avaliação do imóvel,
              cartório e impostos.
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
            <div>
              <label htmlFor="nome-full" className="block text-sm font-medium text-libra-navy mb-1">
                Nome Completo *
              </label>
              <Input
                id="nome-full"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite seu nome completo"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="email-full" className="block text-sm font-medium text-libra-navy mb-1">
                E-mail *
              </label>
              <Input
                id="email-full"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                required
                aria-required="true"
              />
            </div>
            
            <div>
              <label htmlFor="telefone-full" className="block text-sm font-medium text-libra-navy mb-1">
                Telefone *
              </label>
              <Input
                id="telefone-full"
                type="tel"
                value={telefone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder="(99) 99999-9999"
                inputMode="numeric"
                required
                aria-required="true"
              />
            </div>

            <fieldset className="space-y-3">
              <legend id="tipo-imovel-legend" className="text-sm font-medium text-libra-navy">
                O imóvel que será utilizado como garantia é: *
                <div className="text-xs text-gray-500 font-normal mt-1" title="A matrícula/escritura do imóvel está no seu nome próprio ou de um terceiro?">
                  (A matrícula/escritura do imóvel está no seu nome próprio ou de um terceiro?)
                </div>
              </legend>
              <div className="flex gap-4" role="radiogroup" aria-labelledby="tipo-imovel-legend">
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="radio" 
                    name="imovelProprio" 
                    value="proprio" 
                    checked={imovelProprio === 'proprio'}
                    onChange={(e) => setImovelProprio(e.target.value as 'proprio')}
                    className="text-libra-blue"
                    required
                    aria-describedby="tipo-imovel-help"
                  />
                  Imóvel Próprio
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input 
                    type="radio" 
                    name="imovelProprio" 
                    value="terceiro" 
                    checked={imovelProprio === 'terceiro'}
                    onChange={(e) => setImovelProprio(e.target.value as 'terceiro')}
                    className="text-libra-blue"
                    required
                    aria-describedby="tipo-imovel-help"
                  />
                  Imóvel de terceiro
                </label>
              </div>
              <div id="tipo-imovel-help" className="sr-only">
                Selecione se o imóvel usado como garantia é seu ou de terceiros
              </div>
            </fieldset>

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
