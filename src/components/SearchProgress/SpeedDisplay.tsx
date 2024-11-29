import React from 'react';
import type { SearchSpeed } from '../../types/search';

interface SpeedDisplayProps {
  speed: SearchSpeed;
}

export const SpeedDisplay: React.FC<SpeedDisplayProps> = ({ speed }) => {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-gray-100 p-2 rounded">
        <div className="text-sm font-medium text-gray-500">CPU Speed</div>
        <div className="text-lg font-semibold text-gray-900">{speed.cpu.toFixed(2)} MKey/s</div>
      </div>
      <div className="bg-gray-100 p-2 rounded">
        <div className="text-sm font-medium text-gray-500">GPU Speed</div>
        <div className="text-lg font-semibold text-gray-900">{speed.gpu.toFixed(2)} MKey/s</div>
      </div>
      <div className="bg-gray-100 p-2 rounded">
        <div className="text-sm font-medium text-gray-500">Total Speed</div>
        <div className="text-lg font-semibold text-gray-900">{speed.total.toFixed(2)} MKey/s</div>
      </div>
    </div>
  );
};