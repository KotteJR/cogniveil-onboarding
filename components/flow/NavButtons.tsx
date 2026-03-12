'use client';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface NavButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isFirst?: boolean;
  progress: number;
  canNext: boolean;
}

export default function NavButtons({
  onBack,
  onNext,
  isFirst,
  progress,
  canNext,
}: NavButtonsProps) {
  const size = 62;
  const clamped = Math.min(Math.max(progress, 0), 1);
  const formSideOffset = 'max(12px, calc(50% - 390px - 74px))';

  return (
    <>
      <div className="nav-side-controls">
        <button
          type="button"
          className="btn-icon"
          onClick={onBack}
          aria-label="Go to previous chapter"
          title="Previous"
          style={{
            visibility: isFirst ? 'hidden' : 'visible',
            position: 'fixed',
            left: formSideOffset,
            top: '50%',
            transform: 'translateY(-50%)',
            width: `${size}px`,
            height: `${size}px`,
            padding: 0,
            borderRadius: '999px',
            justifyContent: 'center',
            zIndex: 60,
            background: 'var(--surface)',
            border: '1px solid transparent',
            boxShadow: 'none',
          }}
        >
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={7}
            styles={buildStyles({
              pathColor: 'var(--border)',
              trailColor: 'var(--border)',
              pathTransitionDuration: 0,
            })}
          >
            <span
              style={{
                fontSize: '28px',
                lineHeight: 1,
                color: 'var(--text-muted)',
                transform: 'translateY(-1px)',
              }}
            >
              ←
            </span>
          </CircularProgressbarWithChildren>
        </button>
        <button
          type="button"
          className="btn-icon"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Go to next chapter"
          title="Next"
          style={{
            position: 'fixed',
            right: formSideOffset,
            top: '50%',
            transform: 'translateY(-50%)',
            width: `${size}px`,
            height: `${size}px`,
            padding: 0,
            borderRadius: '999px',
            justifyContent: 'center',
            zIndex: 60,
            background: 'var(--surface)',
            border: '1px solid transparent',
            boxShadow: 'none',
            cursor: canNext ? 'pointer' : 'not-allowed',
            opacity: 1,
          }}
        >
          <CircularProgressbarWithChildren
            value={clamped * 100}
            strokeWidth={7}
            styles={buildStyles({
              pathColor: 'var(--accent)',
              trailColor: 'var(--border)',
              pathTransitionDuration: 0.25,
            })}
          >
            <span
              style={{
                fontSize: '28px',
                lineHeight: 1,
                color: canNext ? 'var(--accent)' : 'var(--text-muted)',
                transform: 'translateY(-1px)',
              }}
            >
              →
            </span>
          </CircularProgressbarWithChildren>
        </button>
      </div>

      <div className="nav-bottom-controls">
        <button
          type="button"
          className="btn-ghost"
          onClick={onBack}
          style={{ visibility: isFirst ? 'hidden' : 'visible' }}
        >
          ← Back
        </button>
        <button
          type="button"
          className="btn-primary"
          onClick={onNext}
          disabled={!canNext}
        >
          Next →
        </button>
      </div>
    </>
  );
}
