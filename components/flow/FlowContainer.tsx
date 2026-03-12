'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FlowState, FlowAnswers, defaultAnswers } from '@/lib/types';
import { CHAPTERS } from '@/lib/questions';
import { getChapterProgress } from '@/lib/chapterProgress';
import ProgressBar from './ProgressBar';
import TopBar from './TopBar';
import NavButtons from './NavButtons';

import Chapter1  from './Chapter1Context';
import Chapter2  from './Chapter2UserVolume';
import Chapter3  from './Chapter3AccessIdentity';
import Chapter4  from './Chapter4KnowledgeBase';
import Chapter5  from './Chapter5Integrations';
import Chapter6  from './Chapter6KnowledgeManagement';
import Chapter7  from './Chapter7Channels';
import Chapter8  from './Chapter8Oversight';
import Chapter9  from './Chapter9Deployment';
import Chapter10 from './Chapter10Summary';

const TOTAL = CHAPTERS.length;

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir < 0 ? 48 : -48, opacity: 0 }),
};

export default function FlowContainer() {
  const [state, setState] = useState<FlowState>({
    currentChapter: 1,
    direction: 1,
    answers: defaultAnswers,
  });

  const go = (to: number) => {
    setState(prev => ({
      ...prev,
      currentChapter: to,
      direction: to > prev.currentChapter ? 1 : -1,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateAnswers = (patch: Partial<FlowAnswers>) => {
    setState(prev => ({ ...prev, answers: { ...prev.answers, ...patch } }));
  };

  const next = () => go(Math.min(state.currentChapter + 1, TOTAL));
  const back = () => go(Math.max(state.currentChapter - 1, 1));
  const reset = () => setState({ currentChapter: 1, direction: -1, answers: defaultAnswers });

  const chapterProps = {
    answers: state.answers,
    updateAnswers,
  };

  const isQuestionChapter = state.currentChapter <= 9;
  const chapterProgress = getChapterProgress(state.currentChapter, state.answers);

  const ChapterMap: Record<number, React.ReactNode> = {
    1:  <Chapter1  key={1}  {...chapterProps} />,
    2:  <Chapter2  key={2}  {...chapterProps} />,
    3:  <Chapter3  key={3}  {...chapterProps} />,
    4:  <Chapter4  key={4}  {...chapterProps} />,
    5:  <Chapter5  key={5}  {...chapterProps} />,
    6:  <Chapter6  key={6}  {...chapterProps} />,
    7:  <Chapter7  key={7}  {...chapterProps} />,
    8:  <Chapter8  key={8}  {...chapterProps} />,
    9:  <Chapter9  key={9}  {...chapterProps} />,
    10: <Chapter10 key={10} answers={state.answers} onBack={back} onReset={reset} />,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ProgressBar current={state.currentChapter} total={TOTAL} />
      <TopBar chapterIndex={state.currentChapter - 1} />

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '96px clamp(20px, 5vw, 40px) 80px' }}>
        <AnimatePresence mode="wait" custom={state.direction}>
          <motion.div
            key={state.currentChapter}
            custom={state.direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: 'easeOut' }}
          >
            {ChapterMap[state.currentChapter]}
          </motion.div>
        </AnimatePresence>
        {isQuestionChapter && (
          <NavButtons
            onBack={back}
            onNext={next}
            isFirst={state.currentChapter === 1}
            progress={chapterProgress.ratio}
            canNext={chapterProgress.isComplete}
          />
        )}
      </div>
    </div>
  );
}
