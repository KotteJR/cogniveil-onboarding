'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, KB_SIZE_OPTIONS, DOC_FORMAT_OPTIONS,
  SOURCE_TYPE_OPTIONS, INTEGRATION_PLATFORM_OPTIONS,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import TagSelect from '@/components/ui/TagSelect';
import SegmentedSelector from '@/components/ui/SegmentedSelector';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function SourceIcon({ type }: { type: string }) {
  if (type === 'folder') return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  );
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4l3 3"/>
      <path d="M3.05 11a9 9 0 0 1 17.9 0"/>
      <path d="M3.05 13a9 9 0 0 0 17.9 0"/>
    </svg>
  );
}

export default function Chapter4KnowledgeBase({ answers, updateAnswers }: Props) {
  const a = answers.chapter4;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter4: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[3]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* KB Size */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Estimated Knowledge Base Size</span>
          <p className="q-title">How large is the total corpus of documentation to be indexed?</p>
          <SegmentedSelector
            options={KB_SIZE_OPTIONS}
            value={a.kbSize}
            onChange={v => set({ kbSize: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Doc formats */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Document Formats</span>
          <p className="q-title">What file types and content formats exist in the knowledge base?</p>
          <TagSelect
            options={DOC_FORMAT_OPTIONS}
            value={a.docFormats}
            onChange={v => set({ docFormats: v })}
            otherValue={a.docFormatOther}
            onOtherChange={v => set({ docFormatOther: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Source type */}
        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <span className="q-label">Content Source Type</span>
          <p className="q-title">How will documents be ingested into CogniVeil?</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {SOURCE_TYPE_OPTIONS.map(opt => (
              <button
                key={opt.value}
                type="button"
                className={`source-card${a.sourceType === opt.value ? ' active' : ''}`}
                style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                onClick={() => set({ sourceType: opt.value as typeof a.sourceType })}
              >
                <div style={{
                  color: a.sourceType === opt.value ? 'var(--accent)' : 'var(--text-muted)',
                  marginBottom: '14px',
                  transition: 'color 200ms',
                }}>
                  <SourceIcon type={opt.icon!} />
                </div>
                <div style={{
                  fontFamily: 'var(--cv-font-mono, monospace)',
                  fontSize: '12px',
                  letterSpacing: '0.04em',
                  color: a.sourceType === opt.value ? 'var(--accent)' : 'var(--text-primary)',
                  marginBottom: '6px',
                  transition: 'color 200ms',
                }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.45', fontFamily: 'var(--cv-font-sans, system-ui)' }}>
                  {opt.description}
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Integration platforms (conditional) */}
        <AnimatePresence>
          {a.sourceType === 'integration' && (
            <motion.div
              variants={fadeUp}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: '32px' }}
            >
              <div style={{
                padding: '24px',
                background: 'var(--surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border)',
              }}>
                <span className="q-label">Integration Platforms</span>
                <p className="q-title" style={{ marginBottom: '16px' }}>Which platforms should CogniVeil sync content from?</p>
                <TagSelect
                  options={INTEGRATION_PLATFORM_OPTIONS}
                  value={a.integrationPlatforms}
                  onChange={v => set({ integrationPlatforms: v })}
                  otherValue={a.integrationPlatformOther}
                  onOtherChange={v => set({ integrationPlatformOther: v })}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

    </div>
  );
}
