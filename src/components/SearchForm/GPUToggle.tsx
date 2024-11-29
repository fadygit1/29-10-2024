import React from 'react';

interface GPUToggleProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GPUToggle: React.FC<GPUToggleProps> = ({ checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="useGPU"
        name="useGPU"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor="useGPU" className="ml-2 block text-sm text-gray-700">
        Use GPU (if available)
      </label>
    </div>
  );
};