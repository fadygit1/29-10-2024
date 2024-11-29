import { useState, useCallback } from 'react';
import { wrap } from 'comlink';
import type { SearchOptions, SearchSpeed } from '../types/search';
import { FileHandler } from '../utils/file-handler';

export function useVanitySearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchSpeed, setSearchSpeed] = useState<SearchSpeed>({ cpu: 0, gpu: 0, total: 0 });
  const [results, setResults] = useState<string[]>([]);
  const [worker, setWorker] = useState<any>(null);

  const handleSearch = useCallback(async (options: SearchOptions) => {
    try {
      setIsSearching(true);
      setProgress(0);
      setResults([]);

      // Read addresses file if provided
      let addresses: string[] = [];
      if (options.addressesFile) {
        addresses = await FileHandler.readTextFile(options.addressesFile);
      }

      // Initialize worker
      const worker = wrap(new Worker(new URL('../utils/search.worker.ts', import.meta.url)));
      setWorker(worker);

      await worker.initialize(options, addresses);
      await worker.start(
        setProgress,
        setSearchSpeed,
        (newResults: string[]) => {
          setResults(prev => [...prev, ...newResults]);
          if (options.outputFile) {
            FileHandler.saveToFile(newResults, options.outputFile);
          }
        }
      );
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    } finally {
      setIsSearching(false);
      if (worker) {
        worker.stop();
      }
    }
  }, []);

  return {
    isSearching,
    progress,
    searchSpeed,
    results,
    handleSearch
  };
}