# 🚀 Checklist de Deploy - Integração Ploomes

## 📋 Passos para Deploy Completo

### 1. **Atualizar Banco de Dados (Supabase)**

Execute os seguintes scripts SQL no Supabase Dashboard:

```sql
-- 1. Adicionar campo imovel_proprio
-- Arquivo: add_imovel_proprio_column.sql

-- 2. Adicionar status integrado_crm
-- Arquivo: add_integrado_crm_status.sql
```

### 2. **Variáveis de Ambiente** (se necessário)

Por enquanto a API do Ploomes está hardcoded. Se precisar tornar configurável:

```env
VITE_PLOOMES_API_URL=https://api-ploomes.vercel.app/cadastro/online/env
```

### 3. **Build e Deploy**

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Deploy (Vercel/Netlify)
npm run deploy
```

### 4. **Testes Pré-Deploy**

- [ ] Teste local com `npm run dev`
- [ ] Simular com sucesso
- [ ] Preencher formulário
- [ ] Verificar logs no console
- [ ] Confirmar no Supabase
- [ ] Testar duplicidade (mesmo email)

### 5. **Monitoramento Pós-Deploy**

#### Queries úteis no Supabase:

```sql
-- Ver últimas integrações
SELECT * FROM simulacoes 
WHERE status = 'integrado_crm' 
ORDER BY created_at DESC 
LIMIT 10;

-- Ver falhas de integração (interessados não integrados)
SELECT * FROM simulacoes 
WHERE status = 'interessado' 
AND created_at < NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- Estatísticas de integração
SELECT 
    status,
    COUNT(*) as total,
    DATE(created_at) as data
FROM simulacoes
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY status, DATE(created_at)
ORDER BY data DESC, status;
```

## ⚠️ Pontos de Atenção

1. **API Ploomes**: Verificar se está online
2. **Formatação**: Valores sem máscara
3. **Duplicidade**: 7 dias por email
4. **Não-bloqueante**: Falhas não impedem salvamento

## 📞 Suporte

Em caso de problemas:
1. Verificar logs do console (F12)
2. Consultar banco Supabase
3. Testar API diretamente: `node teste-ploomes.js`

---

**Deploy aprovado quando todos os itens estiverem ✅**
