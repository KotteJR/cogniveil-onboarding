'use client';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import { CHAPTERS, USER_VOLUME_LABELS } from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import BreakdownBar from '@/components/ui/BreakdownBar';
import { clamp, formatNumber } from '@/lib/utils';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const SLIDER_MAX = 10000;

function UserInput({ label, hint, value, onChange }: { label: string; hint: string; value: number; onChange: (n: number) => void }) {
  return (
    <div style={{ flex: 1, minWidth: '140px' }}>
      <div style={{
        fontFamily: 'var(--cv-font-mono, monospace)',
        fontSize: '10px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        opacity: 0.6,
        marginBottom: '4px',
      }}>
        {label}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px', fontFamily: 'var(--cv-font-sans, system-ui)' }}>
        {hint}
      </div>
      <input
        type="number"
        className="cv-number-input"
        min={0}
        value={value || ''}
        placeholder="0"
        onChange={e => onChange(clamp(parseInt(e.target.value) || 0, 0, 99999))}
      />
    </div>
  );
}

export default function Chapter2UserVolume({ answers, updateAnswers }: Props) {
  const a = answers.chapter2;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter2: { ...a, ...patch } });

  const sliderBg = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${(a.totalUsers / SLIDER_MAX) * 100}%, var(--border) ${(a.totalUsers / SLIDER_MAX) * 100}%, var(--border) 100%)`;

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[1]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* Total users */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">{USER_VOLUME_LABELS.totalUsers.label}</span>
          <p className="q-title">{USER_VOLUME_LABELS.totalUsers.hint}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
            <input
              type="range"
              className="cv-slider"
              min={1}
              max={SLIDER_MAX}
              step={a.totalUsers < 100 ? 1 : a.totalUsers < 1000 ? 10 : 100}
              value={a.totalUsers}
              style={{ flex: 1, background: sliderBg }}
              onChange={e => set({ totalUsers: parseInt(e.target.value) })}
            />
            <div style={{ position: 'relative' }}>
              <input
                type="number"
                className="cv-number-input"
                style={{ width: '120px', textAlign: 'right' }}
                min={1}
                max={99999}
                value={a.totalUsers}
                onChange={e => set({ totalUsers: clamp(parseInt(e.target.value) || 1, 1, 99999) })}
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--cv-font-mono, monospace)', fontSize: '10px', color: 'var(--text-muted)' }}>
            <span>1</span>
            <span style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              {formatNumber(a.totalUsers)}
            </span>
            <span>10,000+</span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* User breakdown */}
        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <span className="q-label">User Breakdown</span>
          <p className="q-title">Estimate how users will engage with the platform daily.</p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <UserInput
              label={USER_VOLUME_LABELS.heavyUsers.label}
              hint={USER_VOLUME_LABELS.heavyUsers.hint}
              value={a.heavyUsers}
              onChange={v => set({ heavyUsers: v })}
            />
            <UserInput
              label={USER_VOLUME_LABELS.midUsers.label}
              hint={USER_VOLUME_LABELS.midUsers.hint}
              value={a.midUsers}
              onChange={v => set({ midUsers: v })}
            />
            <UserInput
              label={USER_VOLUME_LABELS.lightUsers.label}
              hint={USER_VOLUME_LABELS.lightUsers.hint}
              value={a.lightUsers}
              onChange={v => set({ lightUsers: v })}
            />
          </div>

          <BreakdownBar
            heavy={a.heavyUsers}
            mid={a.midUsers}
            light={a.lightUsers}
            total={a.totalUsers}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
