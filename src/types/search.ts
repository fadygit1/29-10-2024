export interface SearchOptions {
  prefix: string;
  addressFormat: 'compressed' | 'uncompressed' | 'both';
  useGPU: boolean;
  threadNumber: number;
  maxFound: number;
  saveInterval: number;
  outputFile: string;
  addressesFile?: File;
  startRange: string;
  endRange: string;
  maxConsecutiveRepeats: number;
}

export interface SearchSpeed {
  cpu: number;
  gpu: number;
  total: number;
}

export interface SearchResult {
  address: string;
  privateKey: string;
}

export interface SearchRange {
  start: string;
  end: string;
}