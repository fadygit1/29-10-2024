import React from 'react';
import type { SearchOptions } from '../types/search';

interface SearchFormProps {
  onSubmit: (options: SearchOptions) => void;
  isSearching: boolean;
}

export function SearchForm({ onSubmit, isSearching }: SearchFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const options: SearchOptions = {
      prefix: formData.get('prefix') as string,
      addressFormat: formData.get('addressFormat') as 'compressed' | 'uncompressed' | 'both',
      useGPU: formData.get('useGPU') === 'on',
      threadNumber: navigator.hardwareConcurrency,
      maxFound: 1,
      saveInterval: parseInt(formData.get('saveInterval') as string),
      outputFile: formData.get('outputFile') as string
    };

    onSubmit(options);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prefix" className="block text-sm font-medium text-gray-700">
          Address Prefix
        </label>
        <input
          type="text"
          id="prefix"
          name="prefix"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="1ABC..."
        />
      </div>

      <div>
        <label htmlFor="addressFormat" className="block text-sm font-medium text-gray-700">
          Address Format
        </label>
        <select
          id="addressFormat"
          name="addressFormat"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="compressed">Compressed</option>
          <option value="uncompressed">Uncompressed</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="useGPU"
          name="useGPU"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label htmlFor="useGPU" className="ml-2 block text-sm text-gray-700">
          Use GPU (if available)
        </label>
      </div>

      <div>
        <label htmlFor="saveInterval" className="block text-sm font-medium text-gray-700">
          Save Interval (seconds)
        </label>
        <input
          type="number"
          id="saveInterval"
          name="saveInterval"
          defaultValue={60}
          min={1}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="outputFile" className="block text-sm font-medium text-gray-700">
          Output File
        </label>
        <input
          type="text"
          id="outputFile"
          name="outputFile"
          defaultValue="results.txt"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isSearching}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSearching ? 'Searching...' : 'Start Search'}
      </button>
    </form>
  );
}