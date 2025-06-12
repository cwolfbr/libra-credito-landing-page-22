# Projeto Libra Crédito - Documentação Geral

Este documento oferece uma visão geral da aplicação e serve como porta de entrada para os demais arquivos de documentação presentes no repositório.

## Visão Geral

A landing page da Libra Crédito foi construída utilizando **Vite**, **React**, **TypeScript** e **Tailwind CSS**. O objetivo principal é permitir a simulação de empréstimo com garantia de imóvel, coletando os dados do usuário e armazenando as informações no **Supabase** para posterior acompanhamento via dashboard administrativo.

## Estrutura de Pastas

```
src/
  components/   # Componentes reutilizáveis de UI
  hooks/        # Hooks customizados
  pages/        # Páginas da aplicação
  services/     # Integrações com APIs e Supabase
  lib/          # Utilidades e configuração do Supabase
public/         # Arquivos estáticos
```

Os arquivos no diretório raiz contêm diversos guias de implementação e debug. Consulte-os para detalhes específicos de cada feature.

## Instruções Rápidas

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse `http://localhost:5173` para visualizar a aplicação.

Para instruções detalhadas de integração com o Supabase, consulte [`SUPABASE_INTEGRATION_README.md`](../SUPABASE_INTEGRATION_README.md). Há também um guia de início rápido em [`QUICK_START.md`](../QUICK_START.md).

## Componentes Principais

- **AdaptiveView** – renderiza diferentes componentes de acordo com o tamanho de tela.
- **ContactForm** – formulário utilizado após a simulação para coleta de dados do cliente.
- **SimulationService** – serviço responsável por enviar os dados da simulação para o Supabase e processar o retorno da API existente.

## Contribuindo

A base do projeto já contém scripts de lint e type check:

```bash
npm run lint
npm run typecheck
```

Recomendamos rodar esses comandos antes de enviar alterações. Caso queira gerar uma build de produção utilize `npm run build`.

## Documentação Complementar

Além deste arquivo, verifique também:

- `SUPABASE_INTEGRATION_README.md` – passo a passo completo da integração com o banco de dados.
- `AUDITORIA_CODIGO.md` – relatório de componentes utilizados e sugestões de limpeza de código.
- Arquivos da pasta raíz terminados em `.md` – diversos guias de otimização, debug e correções aplicadas durante o desenvolvimento.

