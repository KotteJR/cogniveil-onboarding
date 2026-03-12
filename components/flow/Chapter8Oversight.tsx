'use client';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, TRACEABILITY_OPTIONS, SUPERVISORY_REVIEW_OPTIONS,
  COMPLIANCE_FRAMEWORK_OPTIONS, AUDIT_CADENCE_OPTIONS,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import OptionCard from '@/components/ui/OptionCard';
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

export default function Chapter8Oversight({ answers, updateAnswers }: Props) {
  const a = answers.chapter8;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter8: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[7]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* Traceability */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">User Interaction Traceability</span>
          <p className="q-title">Does every user interaction need to be logged with a full audit trail?</p>
          <OptionCard
            options={TRACEABILITY_OPTIONS}
            value={a.traceability}
            onChange={v => set({ traceability: v as typeof a.traceability })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Supervisory review */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Supervisory Review of AI Executions</span>
          <p className="q-title">Should managers be able to review AI execution logs and outputs?</p>
          <OptionCard
            options={SUPERVISORY_REVIEW_OPTIONS}
            value={a.supervisoryReview}
            onChange={v => set({ supervisoryReview: v as typeof a.supervisoryReview })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Compliance frameworks */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Compliance Framework</span>
          <p className="q-title">Which regulatory or security frameworks apply to this organization?</p>
          <TagSelect
            options={COMPLIANCE_FRAMEWORK_OPTIONS}
            value={a.complianceFrameworks}
            onChange={v => set({ complianceFrameworks: v })}
            otherValue={a.complianceOther}
            onOtherChange={v => set({ complianceOther: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Audit cadence */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Audit Cadence</span>
          <p className="q-title">How frequently should AI activity logs be reviewed or audited?</p>
          <OptionCard
            options={AUDIT_CADENCE_OPTIONS}
            value={a.auditCadence}
            onChange={v => set({ auditCadence: v as typeof a.auditCadence })}
            layout="col"
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
