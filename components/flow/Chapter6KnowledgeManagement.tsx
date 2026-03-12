'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import { CHAPTERS, VERSIONING_OPTIONS, VERSION_SURFACE_OPTIONS } from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import TagSelect from '@/components/ui/TagSelect';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Chapter6KnowledgeManagement({ answers, updateAnswers }: Props) {
  const a = answers.chapter6;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter6: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[5]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* Versioning strategy */}
        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <span className="q-label">Document Versioning Strategy</span>
          <p className="q-title">How should document updates be handled when new versions are uploaded?</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {VERSIONING_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`option-card${a.versioning === opt.value ? ' active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  gap: '12px',
                  textAlign: 'left',
                }}
                onClick={() => set({ versioning: opt.value as typeof a.versioning })}
              >
                <div className="card-dot" style={{ marginTop: '4px' }} />
                <div style={{ textAlign: 'left', width: '100%' }}>
                  <div style={{
                    fontFamily: 'var(--cv-font-mono, monospace)',
                    fontSize: '12px',
                    letterSpacing: '0.04em',
                    color: a.versioning === opt.value ? 'var(--accent)' : 'var(--text-primary)',
                    marginBottom: '4px',
                    transition: 'color 200ms',
                  }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.45', fontFamily: 'var(--cv-font-sans, system-ui)' }}>
                    {opt.description}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence>
            {a.versioning === 'custom' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden', marginTop: '12px' }}
              >
                <input
                  type="text"
                  className="cv-text-input"
                  placeholder="Describe your versioning scheme (e.g., v1.2.3, Q2-2025, fiscal-quarter)..."
                  value={a.versioningCustom}
                  onChange={e => set({ versioningCustom: e.target.value })}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Version surface */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Version Difference Surfacing</span>
          <p className="q-title">How should document version differences be presented to end users?</p>
          <TagSelect
            options={VERSION_SURFACE_OPTIONS}
            value={a.versionSurface}
            onChange={v => set({ versionSurface: v })}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
