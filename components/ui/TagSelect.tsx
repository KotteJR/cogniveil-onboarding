'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { SelectOption } from '@/lib/questions';

interface TagSelectProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function TagSelect({ options, value, onChange, otherValue = '', onOtherChange }: TagSelectProps) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter(v => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };

  const showOther = value.includes('Other') && onOtherChange !== undefined;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            className={`tag${value.includes(opt.value) ? ' active' : ''}`}
            onClick={() => toggle(opt.value)}
          >
            {value.includes(opt.value) && (
              <span style={{ fontSize: '8px', letterSpacing: 0 }}>✓</span>
            )}
            {opt.label}
          </button>
        ))}
      </div>
      <AnimatePresence>
        {showOther && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
            className="mt-3"
          >
            <input
              type="text"
              className="cv-text-input"
              placeholder="Please specify..."
              value={otherValue}
              onChange={e => onOtherChange!(e.target.value)}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
