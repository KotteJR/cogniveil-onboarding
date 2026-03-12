'use client';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, RBAC_OPTIONS, SSO_PROVIDER_OPTIONS, SSO_INTEGRATION_OPTIONS, RBAC_TOOLTIP,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import OptionCard from '@/components/ui/OptionCard';
import TagSelect from '@/components/ui/TagSelect';
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

export default function Chapter3AccessIdentity({ answers, updateAnswers }: Props) {
  const a = answers.chapter3;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter3: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[2]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* RBAC */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="q-label" style={{ margin: 0 }}>Role-Based Access Control</span>
            <Tooltip text={RBAC_TOOLTIP} />
          </div>
          <p className="q-title">Will users need different access levels based on their roles?</p>
          <OptionCard
            options={RBAC_OPTIONS}
            value={a.rbac}
            onChange={v => set({ rbac: v as typeof a.rbac })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* SSO Provider */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">SSO Provider</span>
          <p className="q-title">Which identity providers does the organization currently use?</p>
          <TagSelect
            options={SSO_PROVIDER_OPTIONS}
            value={a.ssoProviders}
            onChange={v => set({ ssoProviders: v })}
            otherValue={a.ssoProviderOther}
            onOtherChange={v => set({ ssoProviderOther: v })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* SSO Integration */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">SSO Integration Expectation</span>
          <p className="q-title">Is SSO integration a requirement for this deployment?</p>
          <OptionCard
            options={SSO_INTEGRATION_OPTIONS}
            value={a.ssoIntegration}
            onChange={v => set({ ssoIntegration: v as typeof a.ssoIntegration })}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
