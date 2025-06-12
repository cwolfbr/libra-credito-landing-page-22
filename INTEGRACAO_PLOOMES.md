# 📋 Integração com Ploomes CRM

## 🎯 Visão Geral

A integração com o Ploomes CRM foi implementada para automatizar o cadastro de leads gerados através do simulador de crédito. Sempre que um usuário completa o formulário de contato após a simulação, os dados são automaticamente enviados para o CRM.

## 🔧 Configuração Técnica

### Endpoint
- **URL**: `https://api-ploomes.vercel.app/cadastro/online/env`
- **Método**: POST
- **Content-Type**: application/json

### Campos Obrigatórios

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `cidade` | string | Cidade do lead | "São Paulo - SP" |
| `valorDesejadoEmprestimo` | number | Valor do empréstimo (sem formatação) | 200000.00 |
| `valorImovelGarantia` | number | Valor do imóvel (sem formatação) | 500000.00 |
| `quantidadeParcelas` | number | Número de parcelas | 120 |
| `tipoAmortizacao` | string | Sistema de amortização | "PRICE", "SAC", "SAC e PRICE" |
| `valorParcelaCalculada` | number | Valor da parcela (sem formatação) | 3500.00 |
| `nomeCompleto` | string | Nome completo do lead | "João Silva" |
| `email` | string | Email do lead | "joao@email.com" |
| `telefone` | string | Telefone (apenas números) | "11999999999" |
| `imovelProprio` | string | Propriedade do imóvel | "Imóvel próprio", "Imóvel de terceiro" |
| `aceitaPolitica` | boolean | Aceite da política | true |

## 🔄 Fluxo de Integração

1. **Usuário completa simulação** → Dados salvos no Supabase
2. **Usuário preenche formulário de contato** → Dados pessoais atualizados
3. **Sistema envia para Ploomes** → Cadastro automático no CRM
4. **Tratamento de resposta**:
   - ✅ Sucesso: Lead cadastrado
   - ⚠️ Duplicidade: Lead já existe (7 dias)
   - ❌ Erro: Falha no cadastro

## 📊 Mapeamento de Valores

### Tipo de Amortização
- `SAC` → `"SAC"`
- `PRICE` → `"PRICE"`
- `sac` → `"SAC"`
- `price` → `"PRICE"`

### Propriedade do Imóvel
- `proprio` → `"Imóvel próprio"`
- `terceiro` → `"Imóvel de terceiro"`

### Formatação de Valores
- **Monetários**: Números decimais com 2 casas (ex: 200000.00)
- **Telefone**: Apenas números, sem formatação (ex: 11999999999)

## 🚨 Regras de Negócio

### Bloqueio de Duplicidade
- **Período**: 7 dias
- **Critério**: Email do lead
- **Comportamento**: API retorna `status: false` com mensagem específica
- **UX**: Usuário recebe aviso amigável

### Tratamento de Erros
- Integração é **não-bloqueante**: falhas no CRM não impedem o salvamento no banco
- Erros são logados mas não interrompem o fluxo
- Lead sempre é salvo no Supabase, independente do CRM

## 🔍 Monitoramento

### Status no Banco
- `novo`: Lead criado
- `interessado`: Formulário preenchido
- `integrado_crm`: Enviado com sucesso ao Ploomes
- `contatado`: Em atendimento
- `finalizado`: Processo concluído

### Logs do Console
```javascript
🚀 Iniciando cadastro no Ploomes
📤 Payload formatado para Ploomes
📥 Resposta do Ploomes
✅ Proposta cadastrada no Ploomes com sucesso
⚠️ Lead já existe no Ploomes (últimos 7 dias)
❌ Erro ao cadastrar no Ploomes
```

## 📝 Exemplo de Payload

```json
{
  "cidade": "São Paulo - SP",
  "valorDesejadoEmprestimo": 200000.00,
  "valorImovelGarantia": 500000.00,
  "quantidadeParcelas": 120,
  "tipoAmortizacao": "SAC",
  "valorParcelaCalculada": 3500.00,
  "nomeCompleto": "João Silva",
  "email": "joao@email.com",
  "telefone": "11999999999",
  "imovelProprio": "Imóvel próprio",
  "aceitaPolitica": true
}
```

## 🛠️ Manutenção

### Adicionar Novo Status
```sql
-- Execute no Supabase
ALTER TABLE public.simulacoes 
ADD CONSTRAINT simulacoes_status_check 
CHECK (status IN ('novo', 'interessado', 'contatado', 'finalizado', 'integrado_crm'));
```

### Verificar Integração
```sql
-- Leads integrados com sucesso
SELECT COUNT(*) FROM simulacoes WHERE status = 'integrado_crm';

-- Leads pendentes de integração
SELECT * FROM simulacoes 
WHERE status = 'interessado' 
AND created_at > NOW() - INTERVAL '24 hours';
```

## ⚡ Performance

- Integração assíncrona: não bloqueia a experiência do usuário
- Timeout padrão: 30 segundos
- Retry: Não implementado (pode ser adicionado se necessário)

## 🔐 Segurança

- API pública (verificar necessidade de autenticação futura)
- Validação de dados antes do envio
- Sanitização de inputs (telefone, email)
- Logs sem dados sensíveis em produção
