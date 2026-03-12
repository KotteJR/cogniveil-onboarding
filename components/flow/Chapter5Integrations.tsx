'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, API_INTEGRATION_OPTIONS, HITL_OPTIONS, ASYNC_APPROVAL_OPTIONS, HITL_TOOLTIP,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import OptionCard from '@/components/ui/OptionCard';
import Tooltip from '@/components/ui/Tooltip';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Chapter5Integrations({ answers, updateAnswers }: Props) {
  const a = answers.chapter5;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter5: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[4]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* API Integrations */}
        <motion.div variants={fadeUp} style={{ marginBottom: '32px' }}>
          <span className="q-label">Live API Data Integration</span>
          <p className="q-title">Will any workflows need to pull real-time data from external systems?</p>
          <OptionCard
            options={API_INTEGRATION_OPTIONS}
            value={a.apiIntegrations}
            onChange={v => set({ apiIntegrations: v as typeof a.apiIntegrations })}
          />
        </motion.div>

        <AnimatePresence>
          {a.apiIntegrations === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ overflow: 'hidden', marginBottom: '32px' }}
            >
              <div style={{ paddingTop: '4px' }}>
                <span className="q-label">System Description</span>
                <textarea
                  className="cv-textarea"
                  placeholder="Describe the external systems and the data that needs to be pulled (e.g., CRM for live deal status, ERP for inventory levels)..."
                  value={a.apiDescription}
                  onChange={e => set({ apiDescription: e.target.value })}
                  rows={4}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* HITL */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="q-label" style={{ margin: 0 }}>Human in the Loop</span>
            <Tooltip text={HITL_TOOLTIP} />
          </div>
          <p className="q-title">Do any workflows require a human review checkpoint before execution?</p>
          <OptionCard
            options={HITL_OPTIONS}
            value={a.hitl}
            onChange={v => set({ hitl: v as typeof a.hitl })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Async approval */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Async Approval Processes</span>
          <p className="q-title">Will any actions require queued approval steps with delayed execution?</p>
          <OptionCard
            options={ASYNC_APPROVAL_OPTIONS}
            value={a.asyncApproval}
            onChange={v => set({ asyncApproval: v as typeof a.asyncApproval })}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
