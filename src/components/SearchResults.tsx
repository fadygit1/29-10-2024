import React from 'react';
import type { SearchResult } from '../types/search';

interface SearchResultsProps {
  results: SearchResult[];
}

export function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Results</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {results.map((result, index) => (
            <li key={index} className="px-4 py-4">
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
          ))}
        </ul>
      </div>
    </div>
  );
}