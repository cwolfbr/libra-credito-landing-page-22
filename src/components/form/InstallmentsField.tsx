
import React from 'react';
import { Calendar } from 'lucide-react';

interface InstallmentsFieldProps {
  value: number;
  onChange: (value: number) => void;
}

const InstallmentsField: React.FC<InstallmentsFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-libra-light p-1.5 rounded-full mt-0.5">
        <Calendar className="w-4 h-4 text-libra-blue" />
      </div>
      <div className="flex-1">
        <label className="block text-xs font-medium text-libra-navy mb-1">
          Em quantas parcelas?
        </label>
        <div className="relative">
          <input
            type="range"
            min="36"
            max="180"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              "--value": ((value - 36) / (180 - 36)) * 100 + "%",
            } as React.CSSProperties}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>36</span>
            <span>60</span>
            <span>120</span>
            <span>180</span>
          </div>
          <div className="text-right mt-1">
            <span className="bg-libra-blue text-white px-2 py-0.5 rounded text-xs font-bold">
              {value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentsField;
