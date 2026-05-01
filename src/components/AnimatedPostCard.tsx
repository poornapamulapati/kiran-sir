'use client';

import { motion } from 'framer-motion';

export default function AnimatedPostCard({ children, index }: { children: React.ReactNode, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
