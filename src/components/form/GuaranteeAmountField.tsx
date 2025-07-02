
import React from 'react';
import { Input } from '@/components/ui/input';
import { Home } from 'lucide-react';

interface GuaranteeAmountFieldProps {
  value: string;
  onChange: (value: string) => void;
  showError: boolean;
}

const GuaranteeAmountField: React.FC<GuaranteeAmountFieldProps> = ({ 
  value, 
  onChange, 
  showError 
}) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-libra-light p-1.5 rounded-full flex-shrink-0">
        <Home className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Digite o valor do Imóvel em Garantia
        </label>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="R$ 600.000"
            className="text-sm"
            inputMode="numeric"
          />
        </div>
        {showError && (
          <p className="text-red-500 text-xs mt-1">
            O valor da garantia deve ser pelo menos 2x o valor do empréstimo
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Digite o valor completo • Mínimo 2x o valor do empréstimo
        </p>
      </div>
    </div>
  );
};

export default GuaranteeAmountField;
