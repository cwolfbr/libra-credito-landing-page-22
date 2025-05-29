
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
    <div className="flex items-start gap-3">
      <div className="bg-libra-light p-2 rounded-full mt-1">
        <Home className="w-5 h-5 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-libra-navy mb-2">
          Digite o valor do Imóvel em Garantia
        </label>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="R$ 300.000,00"
          className="text-lg"
        />
        {showError && (
          <p className="text-red-500 text-sm mt-1">
            O empréstimo não pode exceder 80% do valor da garantia
          </p>
        )}
      </div>
    </div>
  );
};

export default GuaranteeAmountField;
