import React from 'react';

interface AddressFormatSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const AddressFormatSelect: React.FC<AddressFormatSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="addressFormat" className="block text-sm font-medium text-gray-700">
        Address Format
      </label>
      <select
        id="addressFormat"
        name="addressFormat"
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      >
        <option value="compressed">Compressed</option>
        <option value="uncompressed">Uncompressed</option>
        <option value="both">Both</option>
      </select>
    </div>
  );
};