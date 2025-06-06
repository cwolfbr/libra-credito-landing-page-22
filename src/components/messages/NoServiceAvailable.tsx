import React from 'react';
import { XCircle, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NoServiceAvailableProps {
  cidade: string;
  onTryAnotherCity: () => void;
}

/**
 * Componente para quando não realizamos empréstimo na cidade
 */
const NoServiceAvailable: React.FC<NoServiceAvailableProps> = ({
  cidade,
  onTryAnotherCity
}) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="bg-red-100 p-2 rounded-full">
          <XCircle className="w-5 h-5 text-red-600" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Serviço não disponível em {cidade}
          </h3>
          
          <div className="text-red-800 text-sm mb-4">
            <p className="mb-3">
              Infelizmente, ainda <strong>não realizamos empréstimos com garantia 
              de imóvel</strong> na cidade de <strong>{cidade}</strong>.
            </p>
            
            <div className="bg-white rounded p-3 border border-red-100">
              <h4 className="font-medium text-red-900 mb-2">Alternativas disponíveis:</h4>
              <ul className="text-sm space-y-1 text-red-700">
                <li>• Verificar se há outras cidades próximas onde atuamos</li>
                <li>• Aguardar expansão dos nossos serviços para sua região</li>
                <li>• Entrar em contato para mais informações sobre disponibilidade</li>
              </ul>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={onTryAnotherCity}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              size="sm"
            >
              <Search className="w-4 h-4" />
              Tentar Outra Cidade
            </Button>
            
            <Button
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
              size="sm"
              onClick={() => window.open('/contato', '_blank')}
            >
              Entrar em Contato
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoServiceAvailable;
