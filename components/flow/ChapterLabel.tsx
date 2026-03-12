'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { CHAPTERS } from '@/lib/questions';

interface ChapterLabelProps {
  chapterIndex: number;
}

export default function ChapterLabel({ chapterIndex }: ChapterLabelProps) {
  const chapter = CHAPTERS[chapterIndex];
  if (!chapter) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={chapter.id}
        className="chapter-label"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <span className="chapter-num">
          {String(chapter.id).padStart(2, '0')}
        </span>
        <span style={{ color: 'var(--border)', fontSize: '8px' }}>·</span>
        <span>{chapter.slug.replace(/-/g, ' ')}</span>
      </motion.div>
    </AnimatePresence>
  );
}
