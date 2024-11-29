import React, { useRef } from 'react';

interface FileInputsProps {
  onAddressesFileChange: (file: File | null) => void;
  onOutputFileChange: (path: string) => void;
}

export const FileInputs: React.FC<FileInputsProps> = ({
  onAddressesFileChange,
  onOutputFileChange
}) => {
  const outputFileRef = useRef<HTMLInputElement>(null);

  const handleAddressesFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onAddressesFileChange(file);
  };

  const handleOutputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const path = e.target.value;
    onOutputFileChange(path);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Addresses File (Optional)
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleAddressesFileChange}
          className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        <p className="mt-1 text-sm text-gray-500">
          Upload a text file containing Bitcoin addresses (one per line)
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Output File Location
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="file"
            ref={outputFileRef}
            onChange={handleOutputFileChange}
            nwsaveas="results.txt"
            className="block w-full rounded-md border-gray-300 shadow-sm
              focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
};