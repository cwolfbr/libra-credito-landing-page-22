# Otimizações Seguras para Mobile - Quick Wins

## 1. Remover script desnecessário (index.html)

Remova esta linha:
```html
<script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
```

## 2. Otimizar fonte (index.html)

Mude de:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Para:
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
```

## 3. Adicionar font-display swap (index.html)

Após o link da fonte, adicione:
```html
<style>
  @font-face {
    font-family: 'Montserrat';
    font-display: swap;
  }
</style>
```

## 4. Otimizar YouTube para mobile (src/components/Hero.tsx)

Mude:
```tsx
priority={true}
```

Para:
```tsx
priority={!isMobile}
```

## 5. Adicionar defer ao script principal (index.html)

Mude:
```html
<script type="module" src="/src/main.tsx"></script>
```

Para:
```html
<script type="module" src="/src/main.tsx" defer></script>
```

## Essas mudanças devem dar um ganho de ~200-300ms no LCP sem quebrar nada!
