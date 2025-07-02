
import React from 'react';
import { Calendar } from 'lucide-react';

interface InstallmentsFieldProps {
  value: number;
  onChange: (value: number) => void;
}

const InstallmentsField: React.FC<InstallmentsFieldProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-libra-light p-1.5 rounded-full flex-shrink-0">
        <Calendar className="w-4 h-4 text-green-500" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <label className="text-xs font-medium text-libra-navy">
            Em quantas parcelas?
          </label>
          <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-bold">
            {value} meses ({Math.round(value / 12)} anos)
          </span>
        </div>
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
            <span>36<br/>3 anos</span>
            <span>60<br/>5 anos</span>
            <span>120<br/>10 anos</span>
            <span>180<br/>15 anos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentsField;
