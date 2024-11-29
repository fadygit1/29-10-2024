import React from 'react';
import { ProgressBar } from './ProgressBar';
import { SpeedDisplay } from './SpeedDisplay';
import type { SearchSpeed } from '../../types/search';

interface SearchProgressProps {
  progress: number;
  searchSpeed: SearchSpeed;
}

export const SearchProgress: React.FC<SearchProgressProps> = ({ progress, searchSpeed }) => {
  return (
    <div className="mt-4 space-y-4">
      <ProgressBar progress={progress} />
      <SpeedDisplay speed={searchSpeed} />
    </div>
  );
};