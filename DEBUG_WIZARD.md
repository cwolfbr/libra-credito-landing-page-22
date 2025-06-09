# 🔧 ENTENDENDO O WIZARD MOBILE - GUIA DE DEBUG

## 🤔 Possíveis Problemas e Soluções

### 1. **"O wizard não abre"**

**Causa:** O sistema detecta que você não está em mobile.

**Soluções:**
- Use o Chrome DevTools (F12) e ative o modo mobile
- Ou clique em "Forçar Wizard Mobile" no painel amarelo
- Verifique no painel debug se `isMobile: true`

### 2. **"Não consigo navegar com swipe"**

**Possíveis causas:**
- O swipe só funciona em dispositivos touch reais
- No DevTools, o swipe pode não funcionar bem

**Solução:** Use os botões "Próximo" e "Voltar"

### 3. **"Os dados não estão sendo salvos"**

**Debug:**
1. Abra o Console (F12)
2. Digite: `localStorage.getItem('libra-simulation')`
3. Se retornar `null`, os dados não estão sendo salvos

**Solução:** Clique em "Limpar Cache do Wizard" e tente novamente

### 4. **"A validação não deixa eu avançar"**

**Campos obrigatórios:**
- Step 1: Selecionar um valor
- Step 2: Selecionar um prazo
- Step 3: Nome completo + WhatsApp (mínimo 14 caracteres)

## 📱 Como o Wizard Funciona

### Fluxo Completo:

```
1. DETECÇÃO
   ↓
   Verifica se é mobile (width < 768px)
   ↓
2. ABERTURA
   ↓
   Clique em "Iniciar Simulação Mobile"
   ↓
3. STEP 1 - VALOR
   ↓
   Escolha entre 6 opções de valor
   ↓
4. STEP 2 - PRAZO
   ↓
   Escolha o prazo (mostra parcela calculada)
   ↓
5. STEP 3 - CONTATO
   ↓
   Nome + WhatsApp + Email (opcional)
   ↓
6. STEP 4 - RESUMO
   ↓
   Mostra todos os dados + cálculo final
   ↓
7. FINALIZAR
   ↓
   Dados enviados + Mensagem de sucesso
```

## 🐛 Debug Passo a Passo

### 1. **Verifique a Detecção:**
No painel amarelo, confirme:
- `isMobile: true` (ou force com o botão)
- `screenWidth: < 768` (para mobile)
- `isTouchDevice: true` (se for touch)

### 2. **Teste Cada Step:**

**Step 1 - Valor:**
- Clique em qualquer botão de valor
- Deve aparecer borda azul + fundo azul claro
- Mensagem verde de confirmação embaixo

**Step 2 - Prazo:**
- Cada opção mostra a parcela calculada
- Cálculo: 1.19% ao mês de juros

**Step 3 - Contato:**
- Nome: qualquer texto
- WhatsApp: máscara automática (11) 99999-9999
- Email: opcional

**Step 4 - Resumo:**
- Mostra todos os dados
- Cálculo completo
- Botão "Finalizar"

### 3. **Console do Navegador:**

Abra o console (F12) e procure por:
```javascript
// Quando completa:
"Simulação completa:" {dados...}

// Erros de validação:
"Por favor, preencha todos os campos obrigatórios"
```

## 🎯 Teste Rápido

1. Acesse: `/simulacao-wizard`
2. Ative "Forçar Wizard Mobile" (botão amarelo)
3. Clique em "Iniciar Simulação Mobile"
4. Complete os 4 steps
5. Veja o resultado final

## ⚙️ Configurações do Wizard

O wizard tem estas configurações:
- **Auto-save:** Salva a cada mudança
- **Duração do save:** 24 horas
- **Animação:** 300ms entre steps
- **Validação:** Em tempo real
- **Swipe threshold:** 50px

## 🆘 Ainda com Problemas?

Se ainda não funcionar:

1. **Limpe o cache:**
   - Clique em "Limpar Cache do Wizard"
   - Ou no console: `localStorage.clear()`

2. **Force o modo mobile:**
   - Use o botão "Forçar Wizard Mobile"

3. **Verifique o console:**
   - Procure por erros em vermelho
   - Compartilhe comigo os erros

4. **Teste em outro navegador:**
   - Chrome funciona melhor
   - Safari pode ter limitações

## 📸 Screenshots do Fluxo Esperado

### Mobile (Correto):
- Wizard abre em tela cheia
- Header com progress bar
- Bolinhas indicando steps
- Conteúdo do step atual
- Botões fixos no rodapé

### Desktop (Sem forçar):
- Mostra opções de mobile/desktop
- Botão mobile desabilitado
- Sugere usar calculadora desktop

---

**Me diga:** 
1. O que exatamente não funcionou?
2. Qual mensagem de erro apareceu?
3. Em qual step travou?
4. O que mostra no painel debug?

Com essas informações, posso ajudar melhor! 🚀
