'use client';
import { SelectOption } from '@/lib/questions';

interface SegmentedSelectorProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SegmentedSelector({ options, value, onChange }: SegmentedSelectorProps) {
  return (
    <div className="segment-group">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`segment-item${value === opt.value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
