# 🏦 Libra Crédito - Landing Page

> **Sistema completo de simulação e tracking com Supabase + React + TypeScript**

## 📋 Visão Geral

Landing page moderna para **Libra Crédito** com sistema completo de:
- ✅ **Simulação de crédito com garantia de imóvel**
- ✅ **Tracking 360° da jornada do usuário**
- ✅ **Dashboard administrativo**
- ✅ **Integração Supabase + Blog**
- ✅ **Formulário de parceiros**

---

## 🚀 Setup Rápido (5 minutos)

### 1. **Instalar Dependências**
```bash
# Clone e instale
git clone <YOUR_GIT_URL>
cd libra-credito-landing-page-22
npm install
```

### 2. **Configurar Supabase**

#### **a) Setup do Banco:**
```bash
# Execute no SQL Editor do Supabase:
# https://app.supabase.com → SQL Editor → New Query
```
Use o arquivo: `supabase-setup-complete.sql`

### 3. **Configurar Variáveis de Ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Configure suas variáveis no arquivo .env:
# - VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY (obrigatório)
# - VITE_WEBHOOK_URL (opcional - para webhook de simulações)
# - VITE_OPENCAGE_API_KEY (necessário para geocodificação – já incluso em `.env.example` para testes)
# - Outras conforme necessário
```

#### **b) 🔥 CRÍTICO - Configurar Storage:**
1. Acesse: https://app.supabase.com → Seu Projeto → **Storage**
2. Clique em **"Create Bucket"**
3. Configure:
   - **Nome:** `blog-images`
   - **Public bucket:** ✅ **HABILITADO**
   - **File size limit:** 5 MB
   - **MIME types:** `image/jpeg`, `image/png`, `image/gif`, `image/webp`

> ⚠️ **Sem o bucket `blog-images`, as imagens do blog ficarão apenas no localStorage!**

#### **c) 🔒 OPCIONAL - Correções de Segurança:**
Se houver avisos de segurança no Dashboard:
```bash
# Execute no SQL Editor do Supabase:
```
Use o arquivo: `supabase-security-fixes.sql`

### 3. **📧 OPCIONAL - Configurar Emails Automáticos:**
Para ativar emails automáticos no formulário de parceiros:
```bash
# Siga o guia completo:
```
Use o arquivo: `EMAIL_SETUP_GUIDE.md`

### 4. **Executar**
```bash
npm run dev
# Acesse: http://localhost:5173
```

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Analytics:** Custom tracking system
- **Deploy:** Vercel (configurado)

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
├── pages/              # Páginas (Index, Simulacao, Admin, etc)
├── services/           # APIs e integrações
├── utils/              # Utilitários e validações
├── hooks/              # Custom hooks
└── lib/                # Configurações (Supabase, utils)

public/
├── images/             # Imagens otimizadas
└── manifest.json       # PWA config
```

---

## 🎯 Funcionalidades Principais

### **🧮 Simulação de Crédito**
- Formulário inteligente com validação
- Cálculo automático (SAC/Price)
- API externa + fallback local
- Análise de LTV e cidade

### **📊 Tracking Completo**
- Session ID único por usuário
- Captura de UTMs e referrer
- Jornada completa (páginas, tempo)
- Device/browser detection
- LGPD compliant

### **🎛️ Dashboard Admin**
- Lista de simulações em tempo real
- Filtros avançados
- Estatísticas e métricas
- Export CSV
- Gestão de status

### **⚙️ Configurações Financeiras**
No painel `/admin` é possível definir três valores que influenciam o cálculo das parcelas:
- **% DFI** – seguro de Danos Físicos ao Imóvel aplicado mensalmente sobre o valor do imóvel.
- **% Prestamista** – seguro prestamista aplicado sobre o valor financiado acrescido do custo operacional.
- **Taxa Administrativa** – valor fixo somado a cada parcela.

Altere esses campos na seção **"DFI, Prestamista e Taxa Administrativa"** e clique em **Salvar Todas as Configurações**. Os novos valores são gravados no navegador e imediatamente utilizados no simulador para atualizar os cálculos de SAC e Price.

### **📝 Sistema de Blog**
- CMS integrado ao Supabase
- Upload de imagens
- SEO otimizado
- Categorias dinâmicas

### **🤝 Parceiros**
- Formulário específico
- Validação de CNPJ
- **📧 Email automático** para equipe e parceiro
- Integração com CRM

---

## 🔧 Comandos Importantes

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build           # Build para produção
npm run preview         # Preview do build

# Qualidade de código
npm run lint            # ESLint
npm run typecheck       # TypeScript check

# Deploy
npm run build && npm run preview  # Teste completo
```

---

## 📊 URLs do Sistema

| Funcionalidade | URL | Descrição |
|---|---|---|
| 🏠 **Homepage** | `/` | Landing page principal |
| 🧮 **Simulação** | `/simulacao` | Formulário de simulação |
| 🎛️ **Admin** | `/admin` | Dashboard administrativo |
| 📝 **Blog** | `/blog` | Posts e artigos |
| 🤝 **Parceiros** | `/parceiros` | Cadastro de parceiros |
| 🧪 **Diagnóstico** | `/test-supabase` | Teste do sistema |

---

## 🗄️ Estrutura do Banco (Supabase)

### **Tabela: simulacoes**
```sql
- id (UUID, PK)
- session_id (TEXT) - Link com user_journey
- nome_completo, email, telefone
- cidade, valor_emprestimo, valor_imovel
- parcelas, tipo_amortizacao
- status (novo/interessado/contatado/finalizado)
- created_at, updated_at
```

### **Tabela: user_journey**
```sql
- id (UUID, PK)
- session_id (TEXT, UNIQUE)
- utm_source, utm_medium, utm_campaign
- referrer, landing_page
- pages_visited (JSONB)
- device_info (JSONB), ip_address
- created_at, updated_at
```

### **Tabela: blog_posts**
```sql
- id (UUID, PK)
- title, description, content
- category, tags, slug
- image_url, published, featured_post
- meta_title, meta_description
- created_at, updated_at
```

### **Tabela: parceiros**
```sql
- id (UUID, PK)
- nome, email, telefone, cidade
- cnpj, tempo_home_equity, perfil_cliente
- ramo_atuacao, origem, mensagem
- status, created_at, updated_at
```

---

## 🔍 Analytics e Queries Úteis

### **Dashboard Executivo**
```sql
-- Estatísticas gerais
SELECT * FROM get_simulacao_stats();

-- Conversão por fonte
SELECT 
  uj.utm_source,
  COUNT(s.id) as total_simulacoes,
  COUNT(CASE WHEN s.status IN ('interessado', 'contatado') THEN 1 END) as convertidos
FROM simulacoes s
LEFT JOIN user_journey uj ON s.session_id = uj.session_id
GROUP BY uj.utm_source;
```

### **Análise de Comportamento**
```sql
-- Tempo médio no site por conversão
SELECT 
  CASE WHEN s.status IN ('interessado', 'contatado') THEN 'Convertido' ELSE 'Não Convertido' END,
  AVG(uj.time_on_site) as tempo_medio_segundos
FROM simulacoes s
LEFT JOIN user_journey uj ON s.session_id = uj.session_id
GROUP BY 1;
```

---

## 🔗 Integrações

### **Ploomes CRM (Preparado)**
```javascript
// Webhook configurado em /src/services/simulationService.ts
const webhookData = {
  name: input.nomeCompleto,
  email: input.email,
  phone: input.telefone,
  city: input.cidade,
  loan_amount: input.valorEmprestimo,
  utm_source: journeyData?.utm_source
};
```

### **API Externa de Simulação**
- Endpoint principal com fallback local
- Validação de LTV por cidade
- Análise inteligente de crédito

---

## 🚨 Troubleshooting

### **❌ "Module not found"**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **❌ Erro de conexão Supabase**
1. Verificar URL e API Key em `src/lib/supabase.ts`
2. Verificar se tabelas existem no Supabase
3. Verificar políticas RLS

### **❌ Build falhando**
```bash
npm run typecheck  # Verificar erros TypeScript
npm run lint       # Verificar ESLint
```

### **❌ Dados não aparecem no admin**
1. Verificar console do navegador (F12)
2. Testar query no Supabase:
   ```sql
   SELECT COUNT(*) FROM simulacoes;
   ```

---

## 🔒 Segurança e LGPD

- ✅ **Dados sensíveis mascarados** no frontend
- ✅ **Políticas RLS** configuradas no Supabase
- ✅ **Limpeza automática** de dados antigos (2 anos)
- ✅ **Validações robustas** em todos os formulários
- ✅ **Headers de segurança** configurados (Vercel)

---

## 📈 Próximos Passos

### **Imediato (1-2 dias)**
- [ ] Configurar variáveis de ambiente
- [ ] Testar simulação completa
- [ ] Configurar backup automático

### **Curto prazo (1 semana)**
- [ ] Ativar webhook Ploomes
- [ ] Implementar alertas por email
- [ ] Personalizar dashboard admin

### **Médio prazo (1 mês)**
- [ ] Analytics avançadas (GA4)
- [ ] Segmentação de leads
- [ ] Automação de marketing
- [ ] Relatórios executivos

---

## 🎊 Benefícios Alcançados

✅ **Tracking 360°** - Visão completa da jornada do usuário  
✅ **Lead Scoring** - Qualificação automática de leads  
✅ **Conversão Otimizada** - Dados para otimizar funil  
✅ **CRM Ready** - Integração facilitada com Ploomes  
✅ **LGPD Compliant** - Conformidade com privacidade  
✅ **Dashboard Admin** - Gestão centralizada  
✅ **Blog CMS** - Sistema de conteúdo completo  
✅ **Mobile First** - Design responsivo otimizado  

---

## 📞 Suporte

- 🧪 **Página de Teste:** `/test-supabase`
- 🐛 **Debug:** Console do navegador (F12)
- 📖 **Logs:** Dashboard admin → Diagnostics

**🚀 Sistema pronto para produção!**