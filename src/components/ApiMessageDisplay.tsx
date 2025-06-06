import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ApiMessageDisplayProps {
  message: string;
  type: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  showRetryButton?: boolean;
}

/**
 * Componente para exibir mensagens retornadas pela API
 * Pode exibir erros, avisos ou informações com visual apropriado
 */
const ApiMessageDisplay: React.FC<ApiMessageDisplayProps> = ({
  message,
  type = 'error',
  onRetry,
  showRetryButton = true
}) => {
  const getColorClasses = () => {
    switch (type) {
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-500',
          text: 'text-red-700',
          button: 'bg-red-600 hover:bg-red-700'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-500',
          text: 'text-yellow-700',
          button: 'bg-yellow-600 hover:bg-yellow-700'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-500',
          text: 'text-blue-700',
          button: 'bg-blue-600 hover:bg-blue-700'
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-500',
          text: 'text-gray-700',
          button: 'bg-gray-600 hover:bg-gray-700'
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div className={`rounded-lg border p-4 ${colors.container}`}>
      <div className="flex items-start gap-3">
        <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.icon}`} />
        <div className="flex-1">
          <p className={`text-sm font-medium ${colors.text}`}>
            {message}
          </p>
          {showRetryButton && onRetry && (
            <Button
              onClick={onRetry}
              size="sm"
              className={`mt-3 ${colors.button} text-white`}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tentar Novamente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiMessageDisplay;
