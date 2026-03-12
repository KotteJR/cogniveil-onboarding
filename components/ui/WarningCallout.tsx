'use client';
import { motion } from 'framer-motion';

interface WarningCalloutProps {
  text: string;
}

export default function WarningCallout({ text }: WarningCalloutProps) {
  return (
    <motion.div
      className="warning-callout"
      initial={{ opacity: 0, y: 8, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      exit={{ opacity: 0, y: 8, height: 0 }}
      transition={{ duration: 0.25 }}
    >
      <span className="warning-callout-icon">⚠</span>
      <p className="warning-callout-text">{text}</p>
    </motion.div>
  );
}
