import React from 'react';
import { SearchForm } from './components/SearchForm/SearchForm';
import { SearchProgress } from './components/SearchProgress/SearchProgress';
import { SearchResults } from './components/SearchResults/SearchResults';
import { useVanitySearch } from './hooks/useVanitySearch';

function App() {
  const {
    isSearching,
    progress,
    searchSpeed,
    results,
    handleSearch
  } = useVanitySearch();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VanitySearch Plus</h1>
      <SearchForm onSubmit={handleSearch} isSearching={isSearching} />
      {isSearching && <SearchProgress progress={progress} searchSpeed={searchSpeed} />}
      <SearchResults results={results} />
    </div>
  );
}

export default App;