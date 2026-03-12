'use client';
import { SelectOption } from '@/lib/questions';

interface OptionCardProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  layout?: 'row' | 'col';
}

export default function OptionCard({ options, value, onChange, layout = 'row' }: OptionCardProps) {
  return (
    <div className={`flex gap-3 ${layout === 'col' ? 'flex-col' : 'flex-row flex-wrap'}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`option-card${value === opt.value ? ' active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: '12px',
            textAlign: 'left',
            flex: layout === 'row' ? '1 1 0' : undefined,
            minWidth: layout === 'row' ? '160px' : undefined,
          }}
          onClick={() => onChange(opt.value)}
        >
          <div className="card-dot" style={{ marginTop: opt.description ? '4px' : '2px' }} />
          <div style={{ textAlign: 'left', width: '100%' }}>
            <div style={{
              fontFamily: 'var(--cv-font-mono, monospace)',
              fontSize: '12px',
              letterSpacing: '0.04em',
              color: value === opt.value ? 'var(--accent)' : 'var(--text-primary)',
              marginBottom: opt.description ? '4px' : '0',
              transition: 'color 200ms',
            }}>
              {opt.label}
            </div>
            {opt.description && (
              <div style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                lineHeight: '1.45',
                fontFamily: 'var(--cv-font-sans, system-ui)',
              }}>
                {opt.description}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
