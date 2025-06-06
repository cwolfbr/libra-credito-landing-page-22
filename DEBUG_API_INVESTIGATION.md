# 🔧 DEBUG DA API - INVESTIGAÇÃO DE PROBLEMAS

## 📋 Problema Identificado

Algumas cidades estão retornando "API retornou estrutura de dados inválida" ao invés da mensagem específica da API.

## 🛠️ Ferramentas de Debug Implementadas

### 1. **Logs Detalhados na API** (`simulationApi.ts`)
- ✅ Logs do tipo de resposta
- ✅ Verificação se tem parcelas
- ✅ Verificação se é array
- ✅ Quantidade de parcelas
- ✅ Detecção melhorada de erro

### 2. **Script de Debug Console** (`debug-api-console.js`)
**Como usar:**
1. Abra F12 → Console
2. Cole o conteúdo do arquivo
3. Execute: `testApiResponse("Ribeira do Piauí - PI")`

**O que mostra:**
- Resposta completa da API
- Análise detalhada da estrutura
- Teste da nossa lógica de detecção

### 3. **Componente Visual de Debug** (`ApiDebugger.tsx`)
- ✅ Botões para testar diferentes cidades
- ✅ Análise visual da resposta
- ✅ JSON completo da resposta
- ✅ Temporário - remover após resolver

### 4. **Script de Debug Automático** (`debug-api-response.bat`)
**Como usar:**
```bash
.\debug-api-response.bat
```

## 🧪 Cenários de Teste

### **Cenário 1: Cidade que Funciona**
- **Cidade:** "São Paulo - SP"
- **Expectativa:** Retorna dados de parcelas válidos
- **Status:** ✅ Deve funcionar

### **Cenário 2: Cidade com Problema** ⚠️
- **Cidade:** "Ribeira do Piauí - PI"
- **Expectativa:** Retorna mensagem específica da API
- **Status:** ❓ Precisa investigar que tipo de resposta vem

### **Cenário 3: Cidade Inexistente**
- **Cidade:** "Cidade Inexistente - ZZ"
- **Expectativa:** Erro de cidade não encontrada
- **Status:** ❓ Precisa verificar

## 🔍 Melhorias Implementadas

### **1. Detecção de Erro Expandida**
```typescript
// Antes: Só verificava message, erro, error
// Agora: Verifica todos os campos possíveis
const isErrorResponse = (response: any): boolean => {
  if (typeof response === 'string') return true;
  
  if (response && typeof response === 'object') {
    // Se tem parcelas válidas, não é erro
    if (response.parcelas && Array.isArray(response.parcelas) && response.parcelas.length > 0) 
      return false;
    
    // Se tem qualquer campo de mensagem, é erro
    if (response.message || response.erro || response.error || 
        response.msg || response.mensagem || response.detail || response.details) 
      return true;
    
    // Se é objeto mas não tem parcelas nem mensagem, é inválido
    return true;
  }
  
  return true;
};
```

### **2. Extração de Mensagem Melhorada**
```typescript
const getErrorMessage = (response: any): string => {
  if (typeof response === 'string') return response;
  
  if (response && typeof response === 'object') {
    return response.message || 
           response.erro || 
           response.error || 
           response.msg || 
           response.mensagem || 
           response.detail || 
           response.details || 
           'Mensagem não disponível para esta cidade';
  }
  
  return 'Resposta inválida da API';
};
```

### **3. Logs Detalhados**
```typescript
console.log('Resposta completa da API:', JSON.stringify(data, null, 2));
console.log('Tipo da resposta:', typeof data);
console.log('Tem parcelas?', data?.parcelas ? 'Sim' : 'Não');
console.log('É array?', Array.isArray(data?.parcelas));
console.log('Quantidade de parcelas:', data?.parcelas?.length || 0);
```

## 📝 Próximos Passos

### **1. Executar Debug** 
```bash
.\debug-api-response.bat
```

### **2. Testar no Console**
1. F12 → Console
2. Cole `debug-api-console.js`
3. Execute `testApiResponse("Ribeira do Piauí - PI")`

### **3. Usar Componente Visual**
- Na página de simulação verá o painel de debug
- Clique nos botões para testar diferentes cidades
- Analise o JSON retornado

### **4. Identificar o Padrão**
- Verificar que tipo de resposta vem para cidades "problemáticas"
- Ajustar a lógica de detecção conforme necessário
- Implementar tratamento específico

### **5. Limpar Debug**
- Remover `ApiDebugger` do `SimulationForm.tsx`
- Remover logs excessivos se necessário
- Manter apenas o tratamento final

## 🎯 Objetivo

**Descobrir exatamente que tipo de resposta a API retorna para "Ribeira do Piauí - PI" e ajustar nossa lógica para capturar e exibir corretamente a mensagem específica da API.**

---

**Execute o debug e compartilhe os resultados para ajustarmos a detecção!**
