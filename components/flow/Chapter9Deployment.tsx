'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, DEPLOYMENT_MODEL_OPTIONS, HYBRID_WARNING, ONPREM_WARNING,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import WarningCallout from '@/components/ui/WarningCallout';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CloudIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  );
}
function HybridIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4"/>
    </svg>
  );
}
function ServerIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="3" width="20" height="5" rx="1"/>
      <rect x="2" y="10" width="20" height="5" rx="1"/>
      <rect x="2" y="17" width="20" height="5" rx="1"/>
      <circle cx="6" cy="5.5" r="0.5" fill="currentColor"/>
      <circle cx="6" cy="12.5" r="0.5" fill="currentColor"/>
      <circle cx="6" cy="19.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

const ICONS: Record<string, React.ReactNode> = {
  cloud:       <CloudIcon />,
  hybrid:      <HybridIcon />,
  server:      <ServerIcon />,
};

export default function Chapter9Deployment({ answers, updateAnswers }: Props) {
  const a = answers.chapter9;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter9: { ...a, ...patch } });

  const showWarning = a.deploymentModel === 'hybrid' || a.deploymentModel === 'onprem';
  const warningText = a.deploymentModel === 'onprem' ? ONPREM_WARNING : HYBRID_WARNING;

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[8]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        <motion.div variants={fadeUp} style={{ marginBottom: '24px' }}>
          <span className="q-label">Infrastructure Model</span>
          <p className="q-title">How should CogniVeil be deployed and hosted?</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {DEPLOYMENT_MODEL_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`deploy-card${a.deploymentModel === opt.value ? ' active' : ''}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}
                onClick={() => set({ deploymentModel: opt.value as typeof a.deploymentModel })}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', width: '100%' }}>
                  <div style={{
                    color: a.deploymentModel === opt.value ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'color 200ms',
                  }}>
                    {ICONS[opt.icon!]}
                  </div>
                  <div style={{
                    fontFamily: 'var(--cv-font-sans, system-ui)',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: opt.value === 'cloud' ? '#059669' : opt.value === 'hybrid' ? '#D97706' : '#DC2626',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    border: `1.5px solid ${opt.value === 'cloud' ? 'rgba(5,150,105,0.25)' : opt.value === 'hybrid' ? 'rgba(217,119,6,0.25)' : 'rgba(220,38,38,0.25)'}`,
                    background: opt.value === 'cloud' ? 'rgba(5,150,105,0.07)' : opt.value === 'hybrid' ? 'rgba(217,119,6,0.07)' : 'rgba(220,38,38,0.07)',
                    transition: 'all 200ms',
                    whiteSpace: 'nowrap',
                  }}>
                    {opt.badge}
                  </div>
                </div>
                <div style={{
                  fontFamily: 'var(--cv-font-sans, system-ui)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: a.deploymentModel === opt.value ? 'var(--accent)' : 'var(--text-primary)',
                  marginBottom: '6px',
                  transition: 'color 200ms',
                }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5', fontFamily: 'var(--cv-font-sans, system-ui)' }}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showWarning && (
            <motion.div
              key="warning"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                <WarningCallout text={warningText} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
}
