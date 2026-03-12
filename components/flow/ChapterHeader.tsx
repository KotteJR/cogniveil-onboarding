'use client';
import { motion } from 'framer-motion';
import { ChapterMeta } from '@/lib/questions';

interface ChapterHeaderProps {
  chapter: ChapterMeta;
}

export default function ChapterHeader({ chapter }: ChapterHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: '40px' }}
    >
      <div style={{
        fontFamily: 'var(--cv-font-sans, system-ui)',
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        opacity: 0.65,
        marginBottom: '10px',
      }}>
        {String(chapter.id).padStart(2, '0')} · {chapter.slug.replace(/-/g, ' ')}
      </div>
      <h1 style={{
        fontFamily: 'var(--cv-font-sans, system-ui)',
        fontSize: 'clamp(26px, 4vw, 38px)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        lineHeight: 1.15,
        margin: '0 0 10px',
        letterSpacing: '-0.02em',
      }}>
        {chapter.title}
      </h1>
      <p style={{
        fontFamily: 'var(--cv-font-sans, system-ui)',
        fontSize: '15px',
        color: 'var(--text-secondary)',
        margin: 0,
        fontWeight: 400,
        lineHeight: 1.5,
      }}>
        {chapter.subtitle}
      </p>
    </motion.div>
  );
}
