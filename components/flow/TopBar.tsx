'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { CHAPTERS } from '@/lib/questions';
import Image from 'next/image';

interface TopBarProps {
  chapterIndex: number;
  current: number;
  total: number;
}


export default function TopBar({ chapterIndex, current, total }: TopBarProps) {
  const chapter = CHAPTERS[chapterIndex];

  return (
    <div className="top-bar">
      {/* Logo */}
      <Image src="/cogniveil.png" alt="CogniVeil" width={95} height={25} />

      {/* Chapter label */}
      <AnimatePresence mode="wait">
        {chapter && (
          <motion.div
            key={chapter.id}
            className="chapter-label"
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.25 }}
          >
            <span className="chapter-num">{String(chapter.id).padStart(2, '0')}</span>
            <span style={{ color: 'var(--border-strong)', fontSize: '10px' }}>·</span>
            <span>{chapter.title}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step counter */}
      <div style={{
        fontFamily: 'var(--cv-font-sans, system-ui)',
        fontSize: '11px',
        fontWeight: 500,
        color: 'var(--text-muted)',
        letterSpacing: '0.04em',
        minWidth: '60px',
        textAlign: 'right',
      }}>
        {current} / {total}
      </div>
    </div>
  );
}
