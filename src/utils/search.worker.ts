import { expose } from 'comlink';
import { SearchOptions, SearchSpeed } from '../types/search';
import { CryptoUtils } from './crypto';
import { RangeValidator } from './range_validator';

class SearchWorker {
  private options: SearchOptions;
  private addresses: Set<string>;
  private rangeValidator: RangeValidator;
  private isRunning: boolean = false;
  private lastSaveTime: number = 0;

  constructor() {
    this.addresses = new Set();
  }

  async initialize(options: SearchOptions, addresses: string[]): Promise<void> {
    this.options = options;
    this.addresses = new Set(addresses);
    this.rangeValidator = new RangeValidator(options.maxConsecutiveRepeats);
    
    if (!CryptoUtils.validateRange(options.startRange, options.endRange)) {
      throw new Error('Invalid key range');
    }
  }

  async start(
    onProgress: (progress: number) => void,
    onSpeed: (speed: SearchSpeed) => void,
    onResults: (results: string[]) => void
  ): Promise<void> {
    this.isRunning = true;
    const startTime = Date.now();
    let keysChecked = 0;

    try {
      const startBigInt = BigInt(`0x${this.options.startRange}`);
      const endBigInt = BigInt(`0x${this.options.endRange}`);
      const range = endBigInt - startBigInt;
      
      for (let current = startBigInt; current <= endBigInt && this.isRunning; current++) {
        const key = current.toString(16).padStart(64, '0');
        
        if (this.rangeValidator.isValidRange(key)) {
          // Actual key generation and address checking would go here
          keysChecked++;
          
          // Update progress and speed
          const progress = Number(((current - startBigInt) * 100n) / range);
          const elapsed = (Date.now() - startTime) / 1000;
          const speed = {
            cpu: this.options.useGPU ? keysChecked / elapsed / 2 : keysChecked / elapsed,
            gpu: this.options.useGPU ? keysChecked / elapsed / 2 : 0,
            total: keysChecked / elapsed
          };
          
          onProgress(progress);
          onSpeed(speed);
          
          // Save results periodically
          const now = Date.now();
          if (now - this.lastSaveTime >= this.options.saveInterval * 1000) {
            // Actual result saving would go here
            this.lastSaveTime = now;
          }
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  }

  stop(): void {
    this.isRunning = false;
  }
}

const worker = new SearchWorker();
expose(worker);