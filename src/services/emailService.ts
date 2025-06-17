/**
 * Serviço de Email Automático - Libra Crédito
 * 
 * Funcionalidades:
 * - Email automático para equipe quando novo parceiro se cadastra
 * - Email de confirmação para o parceiro (opcional)
 * - Templates personalizados para cada tipo de email
 * - Integração com EmailJS para envio via browser
 */

import emailjs from '@emailjs/browser';

// Configurações do EmailJS (configurado com suas credenciais)
const EMAIL_CONFIG = {
  SERVICE_ID: 'service_wxv7uqy', // ✅ Configurado
  TEMPLATE_ID_ADMIN: 'template_parceiro_admin', // Criar no EmailJS
  TEMPLATE_ID_PARTNER: 'template_parceiro_confirmacao', // Não usar por enquanto
  PUBLIC_KEY: '091Z0UCMWjvGQplKU', // ✅ Configurado
  ADMIN_EMAIL: 'contato@libracredito.com.br', // ✅ Configurado
  FROM_NAME: 'Libra Crédito - Sistema Automático'
};

export interface PartnerEmailData {
  sessionId: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  cnpj?: string;
  tempoHomeEquity: string;
  perfilCliente: string;
  ramoAtuacao: string;
  origem: string;
  mensagem?: string;
  dataSubmissao: string;
  ipAddress?: string;
  userAgent?: string;
}

export class EmailService {
  /**
   * Inicializar EmailJS com configurações
   */
  static initialize(): void {
    try {
      emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
      console.log('✅ EmailJS inicializado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao inicializar EmailJS:', error);
    }
  }

  /**
   * Formatar dados do parceiro para email legível
   */
  private static formatPartnerData(data: PartnerEmailData): string {
    const cnpjInfo = data.cnpj ? `\n📄 CNPJ: ${data.cnpj}` : '';
    const mensagemInfo = data.mensagem ? `\n💬 Mensagem: ${data.mensagem}` : '';
    
    return `
🏢 NOVO CADASTRO DE PARCEIRO - LIBRA CRÉDITO

👤 DADOS PESSOAIS:
• Nome: ${data.nome}
• Email: ${data.email}
• Telefone: ${data.telefone}
• Cidade: ${data.cidade}${cnpjInfo}

💼 INFORMAÇÕES PROFISSIONAIS:
• Experiência Home Equity: ${data.tempoHomeEquity}
• Perfil de Cliente: ${data.perfilCliente}
• Ramo de Atuação: ${data.ramoAtuacao}
• Como nos conheceu: ${data.origem}${mensagemInfo}

📊 DADOS TÉCNICOS:
• Data/Hora: ${data.dataSubmissao}
• Session ID: ${data.sessionId}
• IP: ${data.ipAddress || 'N/A'}
• Navegador: ${data.userAgent ? data.userAgent.substring(0, 100) + '...' : 'N/A'}

⚡ PRÓXIMOS PASSOS:
1. Entrar em contato em até 24h
2. Avaliar perfil e compatibilidade
3. Enviar materiais e contratos
4. Agendar reunião de onboarding

🔗 Acesse o dashboard: ${window.location.origin}/admin
    `.trim();
  }

  /**
   * Enviar email para a equipe administrativa
   */
  static async sendAdminNotification(partnerData: PartnerEmailData): Promise<boolean> {
    try {
      const emailData = {
        to_email: EMAIL_CONFIG.ADMIN_EMAIL,
        from_name: EMAIL_CONFIG.FROM_NAME,
        subject: `🚨 Novo Parceiro: ${partnerData.nome} - ${partnerData.cidade}`,
        partner_name: partnerData.nome,
        partner_email: partnerData.email,
        partner_phone: partnerData.telefone,
        partner_city: partnerData.cidade,
        partner_business: partnerData.ramoAtuacao,
        partner_experience: partnerData.tempoHomeEquity,
        partner_profile: partnerData.perfilCliente,
        partner_source: partnerData.origem,
        partner_cnpj: partnerData.cnpj || 'Não informado',
        partner_message: partnerData.mensagem || 'Nenhuma mensagem adicional',
        submission_date: partnerData.dataSubmissao,
        session_id: partnerData.sessionId,
        formatted_data: this.formatPartnerData(partnerData),
        dashboard_link: `${window.location.origin}/admin`
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID_ADMIN,
        emailData
      );

      if (response.status === 200) {
        console.log('✅ Email enviado para equipe:', response);
        return true;
      } else {
        console.error('❌ Falha no envio do email:', response);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Erro ao enviar email para equipe:', error);
      return false;
    }
  }

  /**
   * Enviar email de confirmação para o parceiro
   */
  static async sendPartnerConfirmation(partnerData: PartnerEmailData): Promise<boolean> {
    try {
      const emailData = {
        to_email: partnerData.email,
        to_name: partnerData.nome,
        from_name: EMAIL_CONFIG.FROM_NAME,
        subject: '✅ Cadastro Recebido - Libra Crédito Parceiros',
        partner_name: partnerData.nome,
        partner_city: partnerData.cidade,
        partner_business: partnerData.ramoAtuacao,
        submission_date: partnerData.dataSubmissao,
        contact_info: 'contato@libracredito.com.br | (11) 9999-9999'
      };

      const response = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID_PARTNER,
        emailData
      );

      if (response.status === 200) {
        console.log('✅ Email de confirmação enviado para parceiro:', response);
        return true;
      } else {
        console.error('❌ Falha no envio do email de confirmação:', response);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Erro ao enviar email de confirmação:', error);
      return false;
    }
  }

  /**
   * Enviar ambos os emails (admin + confirmação)
   */
  static async sendPartnerEmails(partnerData: PartnerEmailData): Promise<{
    adminSent: boolean;
    confirmationSent: boolean;
    success: boolean;
  }> {
    console.log('📧 Iniciando envio de emails para novo parceiro:', partnerData.nome);
    
    // Inicializar EmailJS se não foi inicializado
    this.initialize();

    const results = {
      adminSent: false,
      confirmationSent: false,
      success: false
    };

    try {
      // Enviar email para equipe (prioridade)
      results.adminSent = await this.sendAdminNotification(partnerData);
      
      // Enviar confirmação para parceiro (opcional)
      results.confirmationSent = await this.sendPartnerConfirmation(partnerData);
      
      // Considerar sucesso se pelo menos o email da equipe foi enviado
      results.success = results.adminSent;
      
      if (results.success) {
        console.log('✅ Emails enviados com sucesso!', results);
      } else {
        console.warn('⚠️ Falha no envio dos emails:', results);
      }
      
      return results;
      
    } catch (error) {
      console.error('❌ Erro geral no envio de emails:', error);
      return results;
    }
  }

  /**
   * Testar configuração de email
   */
  static async testEmailConfiguration(): Promise<boolean> {
    try {
      const testData: PartnerEmailData = {
        sessionId: 'test-session-123',
        nome: 'Teste do Sistema',
        email: 'teste@exemplo.com',
        telefone: '(11) 99999-9999',
        cidade: 'São Paulo',
        cnpj: '12.345.678/0001-90',
        tempoHomeEquity: '1-2 anos',
        perfilCliente: 'Pessoa Jurídica',
        ramoAtuacao: 'Correspondente Bancário',
        origem: 'Google',
        mensagem: 'Esta é uma mensagem de teste do sistema.',
        dataSubmissao: new Date().toLocaleString('pt-BR'),
        ipAddress: '127.0.0.1',
        userAgent: 'Test Browser'
      };

      const result = await this.sendPartnerEmails(testData);
      
      if (result.success) {
        console.log('✅ Teste de email bem-sucedido!');
        return true;
      } else {
        console.error('❌ Teste de email falhou:', result);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Erro no teste de email:', error);
      return false;
    }
  }
}

// Configuração automática de desenvolvimento
if (import.meta.env.DEV) {
  console.log('🔧 Modo desenvolvimento - EmailJS em modo debug');
  
  // Log das configurações (sem expor chaves sensíveis)
  console.log('📧 Configurações de email:', {
    serviceId: EMAIL_CONFIG.SERVICE_ID,
    adminEmail: EMAIL_CONFIG.ADMIN_EMAIL,
    templatesConfigured: {
      admin: EMAIL_CONFIG.TEMPLATE_ID_ADMIN,
      partner: EMAIL_CONFIG.TEMPLATE_ID_PARTNER
    }
  });
}

export default EmailService;