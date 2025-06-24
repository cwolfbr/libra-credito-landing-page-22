/**
 * Serviço de Debug para EmailJS - Libra Crédito
 * Versão simplificada para identificar problemas
 */

import emailjs from '@emailjs/browser';

// Configurações (suas credenciais)
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_wxv7uqy',
  TEMPLATE_ID: 'template_parceiro_admin',
  PUBLIC_KEY: '091Z0UCMWjvGQplKU',
  ADMIN_EMAIL: 'contato@libracredito.com.br'
};

export class EmailDebugService {
  /**
   * Teste básico de configuração
   */
  static async testBasicConfiguration(): Promise<void> {
    console.log('🔧 Testando configuração EmailJS...');
    console.log('📋 Configurações:', {
      serviceId: EMAIL_CONFIG.SERVICE_ID,
      templateId: EMAIL_CONFIG.TEMPLATE_ID,
      publicKey: EMAIL_CONFIG.PUBLIC_KEY.substring(0, 8) + '...',
      adminEmail: EMAIL_CONFIG.ADMIN_EMAIL
    });

    try {
      // Inicializar EmailJS
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS inicializado');

      // Dados de teste mínimos
      const testData = {
        to_email: EMAIL_CONFIG.ADMIN_EMAIL,
        partner_name: 'Teste do Sistema',
        partner_email: 'teste@exemplo.com',
        partner_phone: '(11) 99999-9999',
        partner_city: 'São Paulo',
        partner_business: 'Correspondente Bancário',
        partner_experience: '1-2 anos',
        partner_profile: 'Pessoa Jurídica',
        partner_source: 'Google',
        partner_cnpj: 'Não informado',
        partner_message: 'Mensagem de teste',
        submission_date: new Date().toLocaleString('pt-BR'),
        session_id: 'test-session-123',
        dashboard_link: window.location.origin + '/admin'
      };

      console.log('📧 Enviando email de teste...');
      console.log('📋 Dados do email:', testData);

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        testData
      );

      console.log('✅ Resposta do EmailJS:', response);
      
      if (response.status === 200) {
        console.log('🎉 EMAIL ENVIADO COM SUCESSO!');
        console.log('📬 Verifique a caixa de entrada de:', EMAIL_CONFIG.ADMIN_EMAIL);
        return;
      } else {
        console.error('❌ Status não é 200:', response.status);
      }

    } catch (error) {
      console.error('❌ Erro no teste:', error);
      
      // Analisar tipo de erro
      if (error && typeof error === 'object') {
        console.error('📋 Detalhes do erro:', {
          message: (error as any).message,
          status: (error as any).status,
          text: (error as any).text
        });
      }
    }
  }

  /**
   * Teste de conectividade com EmailJS
   */
  static async testConnectivity(): Promise<void> {
    console.log('🌐 Testando conectividade com EmailJS...');
    
    try {
      // Teste básico de fetch para API do EmailJS
      const testUrl = 'https://api.emailjs.com/api/v1.0/email/send';
      const response = await fetch(testUrl, {
        method: 'OPTIONS' // Teste de CORS
      });
      
      console.log('🌐 Conectividade:', response.status);
      
    } catch (error) {
      console.error('❌ Erro de conectividade:', error);
    }
  }

  /**
   * Verificar se template existe
   */
  static async verifyTemplate(): Promise<void> {
    console.log('📋 Verificando template...');
    
    try {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      
      // Teste com dados mínimos para verificar template
      const minimalData = {
        partner_name: 'Teste',
        partner_email: 'teste@teste.com'
      };

      console.log('📧 Testando template:', EMAIL_CONFIG.TEMPLATE_ID);
      
      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        minimalData
      );

      console.log('✅ Template válido:', response);
      
    } catch (error) {
      console.error('❌ Erro no template:', error);
      
      if ((error as any).status === 400) {
        console.error('❌ Possível erro no template ou dados faltantes');
      } else if ((error as any).status === 409) {
        console.error('❌ Conflito - possível limite atingido ou configuração duplicada');
      }
    }
  }

  /**
   * Executar todos os testes
   */
  static async runAllTests(): Promise<void> {
    console.log('🧪 === INICIANDO TESTES DE EMAIL ===');
    
    await this.testConnectivity();
    console.log('---');
    
    await this.verifyTemplate();
    console.log('---');
    
    await this.testBasicConfiguration();
    
    console.log('🧪 === TESTES CONCLUÍDOS ===');
  }
}

// Disponibilizar globalmente para testes
if (typeof window !== 'undefined') {
  (window as any).EmailDebugService = EmailDebugService;
}

export default EmailDebugService;