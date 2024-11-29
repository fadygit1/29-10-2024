import React from 'react';
import { SearchResult } from './SearchResult';
import type { SearchResult as SearchResultType } from '../../types/search';

interface SearchResultsProps {
  results: SearchResultType[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Results</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <SearchResult key={index} result={result} />
          ))}
        </ul>
      </div>
    </div>
  );
};