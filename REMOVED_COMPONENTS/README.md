# COMPONENTES REMOVIDOS DURANTE LIMPEZA DE CÓDIGO
# Data: Limpeza de dependências e componentes não utilizados

## Componentes UI Removidos (não utilizados):
- accordion.tsx
- alert-dialog.tsx  
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- calendar.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- toggle-group.tsx
- toggle.tsx

## Componentes UI Mantidos (em uso):
- button.tsx
- card.tsx
- dialog.tsx
- input.tsx
- loading-spinner.tsx
- progress.tsx
- select.tsx
- sonner.tsx
- textarea.tsx
- toast.tsx
- toaster.tsx
- tooltip.tsx
- use-toast.ts
- PremiumButton.tsx (customizado)

## Razão da Remoção:
Análise de uso mostrou que estes componentes não estão sendo importados 
ou utilizados em nenhuma parte da aplicação.

## Impacto Esperado:
- Redução de ~70% no bundle size dos componentes UI
- Menor tempo de build
- node_modules mais limpo
- Desenvolvimento mais focado

## Para Restaurar:
Se algum componente for necessário no futuro, ele pode ser:
1. Restaurado deste backup
2. Reinstalado via shadcn/ui
3. Criado novamente conforme necessidade
