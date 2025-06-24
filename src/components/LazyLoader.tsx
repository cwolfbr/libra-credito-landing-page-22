import React, { Suspense } from 'react';

// Componente de Loading personalizado
const PageLoader: React.FC<{ message?: string }> = ({ message = 'Carregando...' }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-libra-blue mx-auto mb-4"></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  </div>
);

// Componente de Error Boundary para lazy loading
class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar página</h2>
            <p className="text-gray-600 mb-4">Tente recarregar a página</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-libra-blue text-white px-4 py-2 rounded hover:bg-libra-blue/90"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC para wrapper de lazy loading
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  loadingMessage?: string
) => {
  const LazyComponent = React.forwardRef<any, P>((props, ref) => (
    <LazyErrorBoundary>
      <Suspense fallback={<PageLoader message={loadingMessage} />}>
        <Component {...props} ref={ref} />
      </Suspense>
    </LazyErrorBoundary>
  ));

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return LazyComponent;
};

// Preloader para páginas importantes
export const preloadComponent = (importFunc: () => Promise<any>) => {
  const componentImport = importFunc();
  return componentImport;
};

// Hook para preload on hover
export const usePreloadOnHover = (importFunc: () => Promise<any>) => {
  const preload = React.useCallback(() => {
    preloadComponent(importFunc);
  }, [importFunc]);

  return {
    onMouseEnter: preload,
    onFocus: preload
  };
};

export default PageLoader;