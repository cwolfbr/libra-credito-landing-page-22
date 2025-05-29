
import React from 'react';
import { Calendar } from 'lucide-react';

interface InstallmentsFieldProps {
  value: number;
  onChange: (value: number) => void;
}

const InstallmentsField: React.FC<InstallmentsFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-libra-light p-2 rounded-full mt-1">
        <Calendar className="w-5 h-5 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-libra-navy mb-2">
          Em quantas parcelas?
        </label>
        <div className="relative">
          <input
            type="range"
            min="12"
            max="240"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>12</span>
            <span>60</span>
            <span>120</span>
            <span>180</span>
            <span>240</span>
          </div>
          <div className="text-right mt-2">
            <span className="bg-libra-blue text-white px-2 py-1 rounded text-sm font-bold">
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentsField;
