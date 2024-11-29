import React, { useState } from 'react';
import { AddressFormatSelect } from './AddressFormatSelect';
import { GPUToggle } from './GPUToggle';
import { SearchFormInput } from './SearchFormInput';
import { RangeInputs } from './RangeInputs';
import { FileInputs } from './FileInputs';
import type { SearchOptions } from '../../types/search';

interface SearchFormProps {
  onSubmit: (options: SearchOptions) => void;
  isSearching: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, isSearching }) => {
  const [options, setOptions] = useState<SearchOptions>({
    prefix: '',
    addressFormat: 'compressed',
    useGPU: false,
    threadNumber: navigator.hardwareConcurrency,
    maxFound: 1,
    saveInterval: 60,
    outputFile: 'results.txt',
    startRange: '0000000000100000000000000000000000000000000000000000000000000000',
    endRange: '0000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    maxConsecutiveRepeats: 4
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setOptions(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddressesFileChange = (file: File | null) => {
    setOptions(prev => ({
      ...prev,
      addressesFile: file
    }));
  };

  const handleOutputFileChange = (path: string) => {
    setOptions(prev => ({
      ...prev,
      outputFile: path
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(options);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SearchFormInput
        label="Address Prefix"
        name="prefix"
        value={options.prefix}
        onChange={handleChange}
        required
        placeholder="1ABC..."
      />

      <RangeInputs
        startRange={options.startRange}
        endRange={options.endRange}
        maxConsecutiveRepeats={options.maxConsecutiveRepeats}
        onChange={handleChange}
      />

      <AddressFormatSelect
        value={options.addressFormat}
        onChange={handleChange}
      />

      <GPUToggle
        checked={options.useGPU}
        onChange={handleChange}
      />

      <SearchFormInput
        label="Save Interval (seconds)"
        name="saveInterval"
        type="number"
        value={options.saveInterval.toString()}
        onChange={handleChange}
        min={1}
      />

      <FileInputs
        onAddressesFileChange={handleAddressesFileChange}
        onOutputFileChange={handleOutputFileChange}
      />

      <button
        type="submit"
        disabled={isSearching}
        className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSearching ? 'Searching...' : 'Start Search'}
      </button>
    </form>
  );
};