import React from 'react';
import type { SearchResult as SearchResultType } from '../../types/search';

interface SearchResultProps {
  result: SearchResultType;
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <li className="px-4 py-4">
      <div className="space-y-2">
        <div>
          <span className="font-medium text-gray-700">Address: </span>
          <span className="font-mono">{result.address}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Private Key: </span>
          <span className="font-mono">{result.privateKey}</span>
        </div>
      </div>
    </li>
  );
};