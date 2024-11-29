import React from 'react';
import { SearchFormInput } from './SearchFormInput';

interface RangeInputsProps {
  startRange: string;
  endRange: string;
  maxConsecutiveRepeats: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RangeInputs: React.FC<RangeInputsProps> = ({
  startRange,
  endRange,
  maxConsecutiveRepeats,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <SearchFormInput
        label="Start Range (hex)"
        name="startRange"
        value={startRange}
        onChange={onChange}
        placeholder="0000000000100000000000000000000000000000000000000000000000000000"
        required
      />
      
      <SearchFormInput
        label="End Range (hex)"
        name="endRange"
        value={endRange}
        onChange={onChange}
        placeholder="0000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        required
      />

      <SearchFormInput
        label="Max Consecutive Repeats"
        name="maxConsecutiveRepeats"
        type="number"
        value={maxConsecutiveRepeats.toString()}
        onChange={onChange}
        min={1}
        required
      />
    </div>
  );
};