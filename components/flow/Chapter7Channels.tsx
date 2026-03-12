'use client';
import { motion } from 'framer-motion';
import { FlowAnswers } from '@/lib/types';
import {
  CHAPTERS, DEPLOYMENT_MODE_OPTIONS, POST_DEPLOYMENT_OPTIONS, TEAMS_BOT_OPTIONS,
} from '@/lib/questions';
import ChapterHeader from './ChapterHeader';
import OptionCard from '@/components/ui/OptionCard';

interface Props {
  answers: FlowAnswers;
  updateAnswers: (p: Partial<FlowAnswers>) => void;
}

const stagger = { animate: { transition: { staggerChildren: 0.09 } } };
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Chapter7Channels({ answers, updateAnswers }: Props) {
  const a = answers.chapter7;
  const set = (patch: Partial<typeof a>) => updateAnswers({ chapter7: { ...a, ...patch } });

  return (
    <div>
      <ChapterHeader chapter={CHAPTERS[6]} />

      <motion.div variants={stagger} initial="initial" animate="animate">

        {/* Deployment mode */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Platform Usage Mode</span>
          <p className="q-title">How does the organization intend to use CogniVeil?</p>
          <OptionCard
            options={DEPLOYMENT_MODE_OPTIONS}
            value={a.deploymentMode}
            onChange={v => set({ deploymentMode: v as typeof a.deploymentMode })}
            layout="col"
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Post-deployment support */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Post-Deployment Support</span>
          <p className="q-title">Will the team need active support for building internal AI workflows after launch?</p>
          <OptionCard
            options={POST_DEPLOYMENT_OPTIONS}
            value={a.postDeploymentSupport}
            onChange={v => set({ postDeploymentSupport: v as typeof a.postDeploymentSupport })}
          />
        </motion.div>

        <motion.div variants={fadeUp}><div className="q-divider" /></motion.div>

        {/* Teams Bot */}
        <motion.div variants={fadeUp} style={{ marginBottom: '40px' }}>
          <span className="q-label">Microsoft Teams Integration</span>
          <p className="q-title">Is embedding CogniVeil as a Microsoft Teams bot a requirement?</p>
          <OptionCard
            options={TEAMS_BOT_OPTIONS}
            value={a.teamsBot}
            onChange={v => set({ teamsBot: v as typeof a.teamsBot })}
          />
        </motion.div>

      </motion.div>

    </div>
  );
}
