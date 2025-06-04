# Passos para resolver o problema do Vercel

## 1. Limpe completamente o cache local e do git:

```bash
# Remova arquivos problemáticos
rm -f 0.backup
rm -f vercel.json.backup

# Garanta que o arquivo 0 não está no git
git rm -f 0 --cached 2>/dev/null || true

# Delete o vercel.json atual
rm -f vercel.json
```

## 2. Faça commit sem vercel.json:

```bash
git add -A
git commit -m "fix: remover todos os arquivos problemáticos"
git push
```

## 3. Se ainda falhar, tente:

### Opção A - Force push limpo:
```bash
# Crie um novo branch
git checkout -b fix-deploy

# Force add apenas os arquivos necessários
git add src/ public/ index.html package.json package-lock.json *.config.* tsconfig.* .gitignore

# Commit
git commit -m "fix: deploy limpo sem arquivos problemáticos"

# Push o novo branch
git push origin fix-deploy
```

### Opção B - Deploy manual no Vercel:
1. Vá para o dashboard do Vercel
2. Delete o projeto atual
3. Crie um novo projeto
4. Importe do GitHub novamente

## 4. Configurações recomendadas no Vercel UI:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`
- Node Version: 18.x
