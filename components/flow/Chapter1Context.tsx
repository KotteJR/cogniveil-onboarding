'use client';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import { CHAPTERS, INDUSTRY_OPTIONS, DEPARTMENT_OPTIONS } from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import TagSelect from '@/components/ui/TagSelect';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Chapter1Context({ answers, updateAnswers }: Props) {
  const a = answers.chapter1;

  const set = (patch: Partial<typeof a>) =>
    updateAnswers({ chapter1: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[0]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* Industry */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Industry / Vertical</span>
          <p className="q-title">Which industry or sector best describes this organization?</p>
          <TagSelect
            options={INDUSTRY_OPTIONS}
            value={a.industries}
            onChange={v => set({ industries: v })}
            otherValue={a.industryOther}
            onOtherChange={v => set({ industryOther: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="q-divider" />
        </motion.div>

        {/* Department */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Department / Use Case</span>
          <p className="q-title">Which internal team or function will primarily use this platform?</p>
          <TagSelect
            options={DEPARTMENT_OPTIONS}
            value={a.departments}
            onChange={v => set({ departments: v })}
            otherValue={a.departmentOther}
            onOtherChange={v => set({ departmentOther: v })}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
