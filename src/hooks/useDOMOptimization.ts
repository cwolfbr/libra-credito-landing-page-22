/**
 * Hook para otimização de DOM e performance
 * Reduz re-renders desnecessários e otimiza elementos DOM
 */

import { useCallback, useMemo } from 'react';

export const useDOMOptimization = () => {
  // Memoizar formatação de valores monetários
  const formatCurrency = useCallback((value: number): string => {
    return value.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, []);

  // Memoizar formatação de números
  const formatNumber = useCallback((value: number, decimals = 0): string => {
    return value.toLocaleString('pt-BR', { 
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }, []);

  // Criar classes CSS otimizadas
  const createOptimizedClasses = useCallback((baseClasses: string, conditionalClasses?: Record<string, boolean>) => {
    let classes = baseClasses;
    
    if (conditionalClasses) {
      Object.entries(conditionalClasses).forEach(([className, condition]) => {
        if (condition) {
          classes += ` ${className}`;
        }
      });
    }
    
    return classes;
  }, []);

  // Reduzir profundidade DOM criando elementos mais simples
  const createFlatElement = useCallback((tag: string, content: string, className?: string) => {
    return {
      tag,
      content,
      className: className || ''
    };
  }, []);

  return {
    formatCurrency,
    formatNumber,
    createOptimizedClasses,
    createFlatElement
  };
};

/**
 * Hook específico para otimização de listas grandes
 */
export const useListOptimization = <T>(
  items: T[],
  keyExtractor: (item: T, index: number) => string
) => {
  // Memoizar keys das listas para evitar re-renders
  const memoizedKeys = useMemo(() => {
    return items.map(keyExtractor);
  }, [items, keyExtractor]);

  // Chunking para listas muito grandes
  const createChunks = useCallback((chunkSize: number = 10) => {
    const chunks: T[][] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }
    return chunks;
  }, [items]);

  return {
    memoizedKeys,
    createChunks,
    totalItems: items.length
  };
};