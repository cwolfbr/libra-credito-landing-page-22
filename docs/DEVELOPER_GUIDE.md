# 🔧 GUIA DE DESENVOLVIMENTO - Libra Crédito

Este documento apresenta as informações necessárias para que novos desenvolvedores possam contribuir com o projeto **Libra Crédito - Landing Page**.

## 📁 Estrutura de Pastas

```
root
├── public/                # Assets estáticos
├── src/
│   ├── components/        # Componentes reutilizáveis (UI)
│   ├── pages/             # Páginas da aplicação e rotas
│   ├── services/          # Integrações com APIs externas e Supabase
│   ├── hooks/             # Hooks customizados (ex.: tracking)
│   ├── utils/             # Funções utilitárias e validações
│   └── lib/               # Configurações (Supabase, helpers)
├── database/              # Scripts SQL e migrações
├── scripts/               # Scripts auxiliares de build/optimizações
└── docs/                  # Documentação adicional
```

## 🚀 Setup de Ambiente

1. **Instalar dependências**
   ```bash
   npm install
   ```
2. **Configurar `.env`**
   - Copiar `.env.example` → `.env`
   - Definir `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`
   - Variáveis adicionais: `VITE_WEBHOOK_URL`, chaves de email (opcional)
3. **Configurar Supabase**
   - Executar `supabase-setup-complete.sql` no SQL Editor
   - Criar bucket público `blog-images` no Storage

## 🧪 Comandos de Desenvolvimento

```bash
npm run dev        # Servidor de desenvolvimento
npm run lint       # Verificação ESLint
npm run typecheck  # Verificação TypeScript
npm run build      # Build de produção
npm test           # Testes (placeholder)
```

## 🧱 Convenções de Código

- **TypeScript** para todo o código fonte
- **ESLint + TypeScript-ESLint** configurados; corrigir avisos antes de commit
- **Tailwind CSS** para estilização
- Componentes `shadcn/ui` seguem padrão de composição via `className`
- Preferir hooks para lógica de negócio compartilhada

## 🔗 Integrações Principais

- **Supabase**: base de dados (`simulacoes`, `user_journey`, `parceiros`, `blog_posts`), autenticação e storage
- **Serviço de Simulação**: integra API externa com fallback local
- **Formulário de Parceiros**: envia dados ao Supabase e dispara e-mails automáticos

## 📦 Deploy

- Deploy padrão via **Vercel**
- Variáveis de ambiente devem estar configuradas no painel da Vercel
- Checar arquivo `vercel.json` para headers de segurança e rotas

## 📝 Fluxo de Contribuição

1. Criar branch a partir de `main`
2. Implementar alterações seguindo convenções acima
3. Executar `npm run lint` e `npm run typecheck`
4. Abrir Pull Request descrevendo mudanças

## 📚 Referências Úteis

- [README principal](../README.md)
- [Guia de Setup Rápido](./QUICK_START.md)
- [Configuração de Storage](./STORAGE_SETUP_GUIDE.md)

