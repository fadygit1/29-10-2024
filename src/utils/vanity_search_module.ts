import { SearchOptions, SearchSpeed } from '../types/search';
import { RangeValidator } from './range_validator';

export class VanitySearchModule {
  private options: SearchOptions;
  private rangeValidator: RangeValidator;
  private worker: Worker | null = null;

  constructor(options: SearchOptions) {
    this.options = options;
    this.rangeValidator = new RangeValidator(options.maxConsecutiveRepeats);
  }

  private async readAddressesFile(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const addresses = text.split('\n').map(line => line.trim()).filter(line => line);
        resolve(addresses);
      };
      reader.onerror = () => reject(new Error('Failed to read addresses file'));
      reader.readAsText(file);
    });
  }

  async search(
    progressCallback: (progress: number) => void,
    speedCallback: (speed: SearchSpeed) => void,
    resultsCallback: (newResults: string[]) => void
  ): Promise<void> {
    try {
      // Read addresses file if provided
      let addresses: string[] = [];
      if (this.options.addressesFile) {
        addresses = await this.readAddressesFile(this.options.addressesFile);
      }

      // Initialize Web Worker for search
      this.worker = new Worker(new URL('./search.worker.ts', import.meta.url));

      this.worker.onmessage = (e) => {
        const { type, data } = e.data;
        switch (type) {
          case 'progress':
            progressCallback(data);
            break;
          case 'speed':
            speedCallback(data);
            break;
          case 'results':
            resultsCallback(data);
            break;
          case 'error':
            throw new Error(data);
        }
      };

      // Start the search
      this.worker.postMessage({
        options: this.options,
        addresses,
        rangeValidator: this.rangeValidator
      });

    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  destroy(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}