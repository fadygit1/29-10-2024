import React from 'react';
import type { SearchSpeed } from '../types/search';

interface SearchProgressProps {
  progress: number;
  searchSpeed: SearchSpeed;
}

export function SearchProgress({ progress, searchSpeed }: SearchProgressProps) {
  return (
    <div className="mt-4 space-y-2">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
              Progress
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-indigo-600">
              {progress.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
          <div
            style={{ width: `${progress}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-100 p-2 rounded">
          <div className="text-sm font-medium text-gray-500">CPU Speed</div>
          <div className="text-lg font-semibold text-gray-900">{searchSpeed.cpu.toFixed(2)} MKey/s</div>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <div className="text-sm font-medium text-gray-500">GPU Speed</div>
          <div className="text-lg font-semibold text-gray-900">{searchSpeed.gpu.toFixed(2)} MKey/s</div>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <div className="text-sm font-medium text-gray-500">Total Speed</div>
          <div className="text-lg font-semibold text-gray-900">{searchSpeed.total.toFixed(2)} MKey/s</div>
        </div>
      </div>
    </div>
  );
}